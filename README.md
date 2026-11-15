# LFAEA — Static Research Atlas

This is the GitHub Pages-ready static edition of the Lunar Fire & Aerosol Evidence Atlas. The site runs directly in the browser and does not require Node.js, a server process, an API key, or a database.

## Run locally

For a local preview, use VS Code Live Server or another simple static file preview tool. This allows the browser to load the bundled JSON files; no Node.js, `npm install`, or `npm start` is needed. On GitHub Pages, the site loads directly from the published static files.

## Publish on GitHub Pages

1. Extract this ZIP. The `index.html` file is at the top level of the extracted project.
2. Upload **the contents** of this folder to the top level (root) of your GitHub repository. Do not upload the enclosing folder as a nested directory.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the Pages deployment to complete and open the published URL.

## Included functionality

- Research overview, investigation library, comparisons, methodology and source register.
- PSI-159 and PSI-142 interactive data views using the bundled derived JSON.
- Conceptual 3D combustion visualisation (Three.js loaded from its public CDN).
- Local evidence assistant that searches the bundled knowledge-base excerpts and returns source links.
- Supplied raw files, derived datasets, and reference PDFs.

## Important assistant limitation

The assistant is a deterministic, extractive browser-side search tool. It does not call ChatGPT or any other online generative model. This avoids exposing a private API key in public browser code and allows the site to run on static hosting. It returns relevant passages from the bundled project evidence rather than inventing a free-form response.

## Data integrity

- PSI-159 source-channel values and setpoints are preserved as recorded. Setpoint voltages are not converted to flow rates without the required lookup and calibration.
- PSI-142 Data ID 1 and 2 label conflict is retained; the site does not choose an ozone label as authoritative.
- Data ID 6 remains unclassified where the workbook field mapping is ambiguous.
- Derived series are for browser visualisation; raw source files remain under `datasets/raw/`.

## Project disclaimer

Independent student research prototype. It is not a NASA product, NASA-endorsed service, certified fire-safety system, or operational decision-support tool.
- The PDF "NASA_PSI_Microgravity_Combustion_Review_EN_With_Uploaded_Data.pdf" carries the note: "This document is solely my personal effort."
