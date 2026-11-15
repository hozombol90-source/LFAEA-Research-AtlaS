# LFAEA dataset ingestion report

- PSI-159 B1 raw data: 9,627 rows, 36 channels, 76.996 s.
- PSI-159 A4 setpoints: 36 rows, MFCA1 non-zero rows = 3 at [0.74] V.
- Camera 21256A4 · INTNS: 1,275 metadata records; ['1392'] × ['1040'] px; pixel format ['Mono16'].
- Camera 21256B1 · ACME: 286 metadata records; ['1360'] × ['1024'] px; pixel format ['BayerRG12'].
- PSI-142 workbook: 9 sheets, Data IDs 1–8 parsed; ID 6 withheld from plotting per source caveat.

## Important scientific limits

- PSI-159 raw channel values have no complete channel dictionary / calibration in this package. Units remain unassigned.
- MFC setpoints are volts, not volumetric flow rates.
- Camera metadata does not include the referenced TIFF/HOBJ image payloads.
- PSI-142 Data ID 1/2 ozone labels conflict between the workbook and CSV crosswalk.
- Raw files are preserved unchanged in `datasets/raw`; sampled points are for browser visualisation only.
