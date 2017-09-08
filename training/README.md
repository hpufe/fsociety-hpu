## Tesseract for Training

Tesseract for Training.

Quick start:

```
cd path/to/fsociety-hpu/training/training-it/

sh training-it.sh
```

You can run these commands manually.

```
# Run Tesseract for Training
tesseract hpu.font.exp0.tif hpu.font.exp0 box.train

# Generate the unicharset file
unicharset_extractor hpu.font.exp0.box

# Mftraining
mftraining -F font_properties -U unicharset -O hpu.unicharset hpu.font.exp0.tr

# Cntraining...
cntraining hpu.font.exp0.tr

# Rename
mv normproto hpu.normproto
mv inttemp hpu.inttemp
mv pffmtable hpu.pffmtable
mv shapetable hpu.shapetable

# Create Tessdata
combine_tessdata hpu.

# ok!
```

[Learn more](https://github.com/tesseract-ocr/tesseract/wiki/Training-Tesseract#run-tesseract-for-training)