#!/usr/bin/env bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <transcript> <file>"
  echo "e.g.: $0 '안녕하세요 반갑습니다' test4.m4a"
  exit 1
fi

. ./config.sh
. ./path.sh

transcript=$1
file=$2

file_path=$PWD/server/temp/raw/$2
result_file_path=$PWD/server/temp/result/$2.json

id=$(($(date +%s%N)/1000000))

course=$id
user=104

data=$BASE_DIR/data
log=$BASE_DIR/log
trans=$log/trans/$id
ali=$log/ali/$id
make_mfcc=$log/make_mfcc
mfcc=$log/mfcc

model=$BASE_DIR/model
lm=$model/lm

final=$FINAL_DIR/result

exp=$model/chain_rvb

decoder=$KALDI_ROOT/src/online2bin/online2-wav-nnet3-latgen-faster

cmd="run.pl --mem 2G"

startTime=startTime=$(date +'%F %H:%M:%S')
echo $startTime

if [ ! -d $log ]; then
    mkdir $log;
    mkdir $log/trans;
    mkdir $log/ali;
    mkdir $log/make_mfcc;
    mkdir $log/mfcc;
fi

if [ ! -d $final ]; then
    mkdir $final;
fi

cd $ZEROTH_ROOT

mkdir $data/$course

mkdir $data/$course/$user

echo $transcript > $data/$course/text
echo $transcript > $data/$course/$course.trans.txt

ffmpeg -y -i $file_path -sample_fmt s16 -ar 16000 $data/$course/$user/${course}_${user}_${id}.flac
cp $data/$course/$user/${course}_${user}_${id}.flac $final/${course}_${user}_${id}.flac

# data 준비(AUDIO_INFO 파일과 trans.txt 파일 필수)
mkdir $trans
local/data_prep_single.sh $data/$course/$user/${course}_${user}_${id}.flac $course $user $data $trans

# segment update
local/updateSegmentation.sh $trans $lm

# phone generation
python3 local/genPhoneSeq.py $data/$course/$course.trans.txt $data/$course/$course.prons.txt

## audio를 mfcc로 변환
steps/make_mfcc.sh --nj 1 --cmd "$cmd" $trans $make_mfcc $mfcc

## cmvn stats를 계산
steps/compute_cmvn_stats.sh $trans $make_mfcc $mfcc

## decode
mkdir $ali
$decoder --do-endpointing=false \
	--frames-per-chunk=20 \
	--extra-left-context-initial=0 \
	--online=false \
	--config=$exp/tdnn1n_rvb_online/conf/online.conf \
	--verbose=2 \
	--min-active=200 --max-active=7000 --beam=1.0 --lattice-beam=6.0 \
	--acoustic-scale=3.0 \
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
python3 $ZEROTH_ROOT/local/calc_pron_score.py $ali/result.txt $data/$course/${course}.prons.txt $data/$course/text $final/${course}_${user}_${id}.json

cp $final/${course}_${user}_${id}.json $result_file_path

rm -rf $data/$course

endTime=$(date +'%F %H:%M:%S')
echo $endTime

