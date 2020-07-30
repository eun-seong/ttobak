#!/usr/bin/env bash

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <course-id> <user-id> <file>"
  echo "e.g.: $0 00008027 104 test4.m4a"
  exit 1
fi

. ./config.sh
. ./path.sh

course=$1
user=$2
file=$PWD/server/temp/$3

id=$(($(date +%s%N)/1000000))

data=$BASE_DIR/data
log=$BASE_DIR/log
trans=$log/trans/$id
ali=$log/ali/$id
mfcc_log=$log/mfcc
model=$BASE_DIR/model

final=$FINAL_DIR/result

lm=$model/lm
mfcc=$model/mfcc
lang=$model/lang
exp=$model/chain_rvb

decoder=$KALDI_ROOT/src/online2bin/online2-wav-nnet3-latgen-faster

cmd="run.pl --mem 2G"

startTime=startTime=$(date +'%F %H:%M:%S')
echo $startTime

if [ ! -d $log ]; then
    mkdir $log;
    mkdir $log/trans;
    mkdir $log/ali;
    mkdir $log/mfcc;
fi

if [ ! -d $final ]; then
    mkdir $final;
fi

cd $ZEROTH_ROOT

ffmpeg -y -i $file -sample_fmt s16 -ar 16000 $data/$course/$user/${course}_${user}_${id}.flac
cp $data/$course/$user/${course}_${user}_${id}.flac $final/${course}_${user}_${id}.flac

# data 준비(AUDIO_INFO 파일과 trans.txt 파일 필수)
mkdir $trans
local/data_prep_single.sh $data/$course/$user/${course}_${user}_${id}.flac $course $user $data $trans

## audio를 mfcc로 변환
steps/make_mfcc.sh --nj 1 --cmd "$cmd" $trans $mfcc_log $mfcc

## cmvn stats를 계산
steps/compute_cmvn_stats.sh $trans $mfcc_log $mfcc

mkdir $ali
$decoder --do-endpointing=false \
	--frames-per-chunk=20 \
	--extra-left-context-initial=0 \
	--online=false \
	--config=$exp/tdnn1n_rvb_online/conf/online.conf \
	--verbose=2 \
	--min-active=200 --max-active=7000 --beam=1.0 --lattice-beam=6.0 \
	--acoustic-scale=1.0 \
	--frame-subsampling-factor=3 \
	--word-symbol-table=$exp/tree_a/graph_tgsmall/words.txt \
	$exp/tdnn1n_rvb_online/final.mdl $exp/tree_a/graph_tgsmall/HCLG.fst "ark:$trans/spk2utt" "ark,s,cs:wav-copy scp,p:$trans/wav.scp ark:- |" \
	"ark:|gzip -c >$ali/lat.1.gz"

$KALDI_ROOT/src/latbin/lattice-align-phones --replace-output-symbols=true $exp/tdnn1n_rvb_online/final.mdl "ark:gunzip -c ${ali}/lat.1.gz|" ark:$ali/phone_aligned.lats

$KALDI_ROOT/src/latbin/lattice-best-path ark:$ali/phone_aligned.lats ark:$ali/out.tra ark:$ali/out.ali

## align을 발음 sequence를 포함한 파일로 출력
$KALDI_ROOT/src/bin/show-alignments $exp/tree_a/graph_tgsmall/phones.txt $exp/tdnn1n_rvb_online/final.mdl ark:$ali/out.ali >> $ali/temp.txt

# 파일을 phone sequence로 변환
python3 local/result2phone.py $ali/temp.txt $ali/result.txt

# 발음 정확도 계산
python3 local/calc_pron_score.py $ali/result.txt $data/$course/${course}.prons.txt $final/${course}_${user}_${id}.txt

endTime=$(date +'%F %H:%M:%S')
echo $endTime
