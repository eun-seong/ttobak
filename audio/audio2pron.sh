#!/usr/bin/env bash

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <course-id> <user-id> <file>"
  echo "e.g.: $0 00008027 104 temp/test4.m4a"
  exit 1
fi

. ./config.sh

course=$1
user=$2
file=$3

id=$(($(date +%s%N)/1000000))

data=$BASE_DIR/data
trans=$BASE_DIR/trans/$id
dest=$BASE_DIR/ali/$id
final=$BASE_DIR/result

lm=$ZEROTH_ROOT/data/local/lm
make_mfcc=$ZEROTH_ROOT/exp/make_mfcc
mfcc_log_dir=$make_mfcc/train_data_01
mfcc=$ZEROTH_ROOT/mfcc
train_data=$ZEROTH_ROOT/exp/train_data_01
lang=$ZEROTH_ROOT/data/lang
exp=$ZEROTH_ROOT/exp/tri4b

decoder=$KALDI_ROOT/src/gmmbin/gmm-latgen-faster

cmd="run.pl --mem 2G"

startTime=startTime=$(date +'%F %H:%M:%S')
echo $startTime

ffmpeg -y -i $file -sample_fmt s16 -ar 16000 $data/$course/$user/${course}_${user}_${id}.flac

# data 준비(AUDIO_INFO 파일과 trans.txt 파일 필수)
$ZEROTH_ROOT/local/data_prep_single.sh $data/$course/$user/${course}_${user}_${id}.flac $course $user $data $trans

## audio를 mfcc로 변환
$ZEROTH_ROOT/steps/make_mfcc.sh --nj 1 --cmd "$cmd" $trans $make_mfcc $mfcc

## cmvn stats를 계산
$ZEROTH_ROOT/steps/compute_cmvn_stats.sh $trans $mfcc_log_dir $mfcc

mkdir $dest
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
	"ark:|gzip -c >$dest/lat.1.gz"

$KALDI_ROOT/src/latbin/lattice-align-phones --replace-output-symbols=true $exp/final.mdl "ark:gunzip -c ${exp}/decode/lat.1.gz|" ark:$dest/phone_aligned.lats

$KALDI_ROOT/src/latbin/lattice-best-path ark:$dest/phone_aligned.lats ark:$dest/out.tra ark:$dest/out.ali

## align을 발음 sequence를 포함한 파일로 출력
$kaldi/src/bin/show-alignments $exp/tree_a/graph_tgsmall/phones.txt $exp/tdnn1n_rvb_online/final.mdl ark:$dest/out.ali >> $dest/temp.txt

# 파일을 phone sequence로 변환
python3 $ZEROTH_ROOT/local/result2phone.py $dest/temp.txt $dest/result.txt

# 발음 정확도 계산
python3 $ZEROTH_ROOT/local/calc_pron_score.py $dest/result.txt $data/$course/${course}.prons.txt $final/${course}_${user}_${id}.txt

endTime=$(date +'%F %H:%M:%S')
echo $endTime
