## Tesseract for Training

Convert `jpeg` to `tif`.
```
convert '*.jpeg' /home/jeneser/workSpace/fsociety-hpu/training/samples-output/img-%d.tif
```

Tesseract for Training
```
# Run Tesseract for Training
tesseract.exe hpu.font.exp0.tif hpu.font.exp0 box.train

# Generate the unicharset file
unicharset_extractor hpu.font.exp0.box

# Mftraining
mftraining -F font_properties -U unicharset -O hpu.unicharset hpu.font.exp0.tr

# Cntraining...
cntraining hpu.font.exp0.tr

# Rename
rename normproto hpu.normproto
rename inttemp hpu.inttemp
rename pffmtable hpu.pffmtable
rename shapetable hpu.shapetable

# Create Tessdata
combine_tessdata hpu.

# ok!
```