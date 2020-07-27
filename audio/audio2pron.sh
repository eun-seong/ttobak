#!/usr/bin/env bash

# 실행할 때 꼭! zeroth/s5 폴더 안에 넣고 실행해야 함

# src=$1
# lm=$2
# make_mfcc=$3
# mfcc=$4
# train_data=$5
# lang=$6
# exp=$7
# dest=$8

course="00008027"
user="104"
id=$(($(date +%s%N)/1000000))

base_dir=~/PycharmProjects
file=$base_dir/temp/test4.m4a

data=$base_dir/data
trans=$base_dir/trans/$id
zeroth=$base_dir/zeroth
kaldi=$base_dir/kaldi
dest=$base_dir/ali/$id
final=$base_dir/result

lm=$zeroth/s5/data/local/lm
make_mfcc=$zeroth/s5/exp/make_mfcc
mfcc_log_dir=$make_mfcc/train_data_01
mfcc=$zeroth/s5/mfcc
train_data=$zeroth/s5/exp/train_data_01
lang=$zeroth/s5/data/lang
exp=$zeroth/s5/exp/tri4b

#decoder=$kaldi/src/online2bin/online2-wav-nnet3-latgen-faster
decoder=$kaldi/src/gmmbin/gmm-latgen-faster

cmd="run.pl --mem 2G"

startTime=startTime=$(date +'%F %H:%M:%S')
echo $startTime

ffmpeg -y -i $file -sample_fmt s16 -ar 16000 $data/$course/$user/${course}_${user}_${id}.flac

# data 준비(AUDIO_INFO 파일과 trans.txt 파일 필수)
#local/data_prep.sh $inner_src $src
local/data_prep_single.sh $data/$course/$user/${course}_${user}_${id}.flac $course $user $data $trans

# zeroth에 적합한 방법으로 단어들을 분리
# 이 부분은 사전에 이미 진행되어 있어야 한다.
#local/updateSegmentation.sh $trans $lm

## audio를 mfcc로 변환
steps/make_mfcc.sh --nj 1 --cmd "$cmd" $trans $make_mfcc $mfcc
#
## cmvn stats를 계산
steps/compute_cmvn_stats.sh $trans $mfcc_log_dir $mfcc

#
## decoding
#steps/align_fmllr.sh --nj 1 --cmd "$cmd" $trans $lang $exp $dest
#steps/decode_fmllr.sh --nj 1 --cmd "$cmd" $exp/graph_tgsmall $trans $exp/decode

#$decoder --word-symbol-table=$exp/phone_graph/words.txt \
#	$exp/final.mdl $exp/phone_graph/HCLG.fst "ark:spk2utt" "ark,s,cs:wav-copy scp,p:wav.scp ark:- |" \
#	"ark:|gzip -c >$dest/lat.1.gz"

steps/decode_fmllr.sh --nj 1 --cmd "$cmd" $exp/graph_tgsmall $trans $exp/decode

mkdir $dest

$kaldi/src/latbin/lattice-align-phones --replace-output-symbols=true $exp/final.mdl "ark:gunzip -c ${exp}/decode/lat.1.gz|" ark:$dest/phone_aligned.lats

$kaldi/src/latbin/lattice-best-path ark:$dest/phone_aligned.lats ark:$dest/out.tra ark:$dest/out.ali

$kaldi/src/bin/show-alignments $exp/graph_tgsmall/phones.txt $exp/final.mdl ark:$dest/out.ali >> $dest/temp.txt

## align을 발음 sequence를 포함한 파일로 출력
$kaldi/src/bin/show-alignments $dest/phones.txt $dest/final.mdl "ark:gunzip -c ${dest}/ali.1.gz|" >> $dest/temp.txt

# 파일을 phone sequence로 변환
python3 result2phone.py $dest/temp.txt $dest/result.txt

# 발음 정확도 계산
python3 calc_pron_score.py $dest/result.txt $data/$course/${course}.prons.txt $final/${course}_${user}_${id}.txt

endTime=$(date +'%F %H:%M:%S')
echo $endTime