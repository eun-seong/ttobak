#!/bin/bash

. ./config.sh

cp config.sh $ZEROTH_ROOT/config.sh

cp calc_pron_score.py $ZEROTH_ROOT/local/calc_pron_score.py
cp result2phone.py $ZEROTH_ROOT/local/result2phone.py
cp data_prep_single.sh $ZEROTH_ROOT/local/data_prep_single.sh

ln -sfn $ZEROTH_ROOT/path.sh path.sh
