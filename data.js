/*
 * LFAEA evidence dataset
 * Source model: supplied NASA PSI research review + update note, with current
 * official NASA/PSI source pages linked in `sources`.
 * All editorial scores are prioritisation heuristics, NOT measured fire-risk scores.
 */
window.LFAEA_DATA = {
  meta: {
    title: "Lunar Fire & Aerosol Evidence Atlas",
    acronym: "LFAEA",
    version: "2.0.0",
    updated: "15 November 2026 · Advanced PSI data ingestion",
    researchCutoff: "14 November 2026",
    disclaimer: "Independent student research prototype. Not a NASA product, operational safety system, material certification, or emergency-response tool."
  },
  scenarios: [
    {id:"lunar", label:"Lunar habitat", description:"Material behaviour and evidence transfer to a pressurised lunar surface habitat."},
    {id:"materials", label:"Material flammability", description:"Ignition, flame growth, spread, and extinction of solid materials."},
    {id:"detection", label:"Smoke detection", description:"Aerosol generation, transport, sensing, and alarm-relevant measurements."},
    {id:"suppression", label:"Suppression research", description:"Extinction mechanisms and evidence related to suppression research."},
    {id:"modeling", label:"Predictive modelling", description:"Data useful for model validation, parameter studies, and combustion mechanisms."},
    {id:"habitat", label:"Crewed habitat", description:"Integrated relevance to spacecraft, stations, bases, and pressurised rovers."}
  ],
  sources: [
    {id:"S01", title:"NASA Physical Sciences Informatics — Data Repository", publisher:"NASA PSI", type:"Repository", date:"Live catalogue", url:"https://psi.nasa.gov/physci/repo", note:"Primary discovery portal. Cite each record using its persistent identifier / DOI."},
    {id:"S02", title:"PSI-107 — Smoke Point In Co-flow Experiment (SPICE)", publisher:"NASA PSI", type:"Investigation record", date:"Version 4 · 18 Sep 2024", url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-107", doi:"10.60555/9kbh-e962", note:"Official record identifies PSI-107 as SPICE; record describes ISS microgravity coflow smoke-point tests."},
    {id:"S03", title:"PSI-25 — Burning and Suppression of Solids-II (BASS-II)", publisher:"NASA PSI", type:"Investigation record", date:"Version 4 · 31 Dec 2022", url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-25", doi:"10.60555/4qc4-de67", note:"Official BASS-II record and objectives for solid-fuel ignition, flame growth, spread, and extinction."},
    {id:"S04", title:"PSI-98 — Spacecraft Fire Safety Experiment-I (SAFFIRE-I)", publisher:"NASA PSI", type:"Investigation record", date:"Version 4 · 18 Sep 2024", url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-98", doi:"10.60555/0t15-1z43", note:"First SAFFIRE investigation record; related records include PSI-99 and PSI-100."},
    {id:"S05", title:"PSI-101 — Smoke Aerosol Measurement Experiment-Reflight (SAME-R)", publisher:"NASA PSI", type:"Investigation record", date:"Version 4 · 18 Sep 2024", url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-101", doi:"10.60555/2np7-jv14", note:"Official record describes aerosol measurements and 66 flight test points."},
    {id:"S06", title:"PSI-69 — Flame Extinguishment Experiment (FLEX)", publisher:"NASA PSI", type:"Investigation record", date:"Version 5 · 06 Jun 2025", url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-69", doi:"10.60555/mbq8-0451", note:"Official record describes liquid-droplet combustion and gaseous suppressant studies."},
    {id:"S07", title:"PSI-159 — ACME Cool Flames Investigation with Gases (CFI-G)", publisher:"NASA PSI", type:"Investigation record", date:"Repository record", url:"https://psi.nasa.gov/physci/repo/data/investigations/PSI-159", note:"Current PSI search index labels PSI-159 as ACME CFI-G. Selected files are analysed in the supplied update appendix."},
    {id:"S08", title:"SoFIE-GEL — Growth and Extinction Limit", publisher:"NASA Science", type:"Investigation page", date:"Live page", url:"https://science.nasa.gov/biological-physical/investigations/sofie-gel/", note:"PMMA sphere; studies flow, oxygen percentage, pressure, and internal sample heating."},
    {id:"S09", title:"SoFIE-MIST — Material Ignition and Suppression Test", publisher:"NASA Science", type:"Investigation page", date:"Live page", url:"https://science.nasa.gov/biological-physical/investigations/sofie-mist/", note:"PMMA cylinder; studies flow, oxygen concentration, pressure, and external radiant flux."},
    {id:"S10", title:"Flammability of Materials on the Moon (FM²)", publisher:"NASA Glenn Research Center", type:"Programme page", date:"Live page", url:"https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/flammability-of-materials-on-the-moon-fm2/", note:"NASA page describes the lunar-gravity experiment concept, hardware, and intended measurements. No FM² result file was included in the supplied PSI upload."},
    {id:"S11", title:"NASA-STD-6001B — Flammability, Odor, Offgassing, and Compatibility", publisher:"NASA Standards", type:"Standard", date:"Version B · Change 3 · 09 Jun 2025", url:"https://standards.nasa.gov/standard/nasa/nasa-std-6001", note:"Material-screening framework; not a universal substitute for mission-specific reduced-gravity evaluation."},
    {id:"S12", title:"Combustion of Solids in Microgravity: Results from BASS-II", publisher:"NASA NTRS", type:"Technical report", date:"2016", url:"https://ntrs.nasa.gov/citations/20160000593", note:"Primary report referenced in the supplied review."},
    {id:"S13", title:"Effects of Flow and Preheating on Flame Spread in Microgravity", publisher:"NASA NTRS", type:"Technical report", date:"2014", url:"https://ntrs.nasa.gov/citations/20140011099", note:"Supporting BASS-related evidence on flow and thermal history."},
    {id:"S14", title:"Flame Burns Out on NASA’s Long-Running Spacecraft Fire Experiment", publisher:"NASA Glenn Research Center", type:"News / programme report", date:"14 Feb 2024", url:"https://www.nasa.gov/centers-and-facilities/glenn/flame-burns-out-on-nasas-long-running-spacecraft-fire-experiment/", note:"NASA reports conclusion of the SAFFIRE series with SAFFIRE VI."},
    {id:"S15", title:"Fire Protection — OCHMO Technical Brief 008", publisher:"NASA Office of the Chief Health and Medical Officer", type:"Technical brief", date:"2023", url:"https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf", note:"Integrated spacecraft fire-protection context."},
    {id:"S16", title:"Multi-Parameter Aerosol Scattering Sensor (MPASS)", publisher:"NASA Technology Transfer", type:"Technology record", date:"LEW-TOPS-19", url:"https://technology.nasa.gov/patent/LEW-TOPS-19", note:"Related aerosol-sensing technology; not a substitute for the SAME/SAME-R measurement record."},
    {id:"S17", title:"NASA PSI Investigations by Research Area", publisher:"NASA", type:"Research-area catalogue", date:"Live page", url:"https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/", note:"Combustion Science catalogue includes BASS, CFI, DAFT, FLEX, SAFFIRE, SAME, SLICE, SPICE, and ACME research areas."},
    {id:"S18", title:"Flame in Freefall — SI-Powered Fire Safety Insights from Microgravity Combustion Data", publisher:"NASA Space Apps Challenge", type:"Challenge brief", date:"2026", url:"https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/", note:"Official challenge statement."},
    {id:"S19", title:"PSI Database is Live with New Features to Improve User Experience", publisher:"NASA Science", type:"Repository update", date:"24 Oct 2024", url:"https://science.nasa.gov/science-research/psi-database-is-live-with-new-features-to-improve-user-experience/", note:"Explains repository redesign and persistent dataset identifiers."},
    {id:"S20", title:"Material Flammability at Lunar and Martian Gravity", publisher:"NASA NTRS", type:"Conference extended abstract", date:"2026", url:"https://ntrs.nasa.gov/citations/20260000646", note:"Related 2026 research context; it is not a PSI investigation record in the supplied dataset."},
    {id:"S21", title:"Smoke Point Properties of Nonbuoyant Coflowing Flames", publisher:"Fire Safety Journal", type:"Peer-reviewed paper", date:"2011", url:"https://doi.org/10.1016/j.firesaf.2011.08.002", doi:"10.1016/j.firesaf.2011.08.002", note:"Reports 55 smoke points; this is kept distinct from the 52-point thesis/conference count."},
    {id:"S22", title:"Laminar Smoke Points of Nonbuoyant Coflowing Flames", publisher:"Conference proceedings", type:"Conference paper", date:"2011", url:"https://doi.org/10.3850/978-981-08-7724-8_12-04", doi:"10.3850/978-981-08-7724-8_12-04", note:"Reports 52 smoke points; count is not merged with the journal article."},
    {id:"S23", title:"FLEX-2: Flame Extinguishment Experiment", publisher:"NASA NTRS", type:"Technical report", date:"2021", url:"https://ntrs.nasa.gov/citations/20210022617", note:"Supporting FLEX-2 reference from the supplied review."},
    {id:"S24", title:"Aspects of Cool-Flame-Supported Droplet Combustion in Microgravity", publisher:"NASA NTRS", type:"Technical report", date:"2016", url:"https://ntrs.nasa.gov/citations/20160000344", note:"Supporting cool-flame / droplet research."},
    {id:"S25", title:"Effects of Ambient Inert Gas Properties on Cool-Flame Combustion", publisher:"NASA NTRS", type:"Technical report", date:"2020", url:"https://ntrs.nasa.gov/citations/20205008449", note:"Supporting cool-flame research."},
    {id:"S26", title:"Smoke Aerosol Measurement Experiment (SAME)", publisher:"NASA / NIST", type:"Technical report", date:"Source cited in review", url:"http://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=904707", note:"Original SAME source cited in the supplied review."},
    {id:"S27", title:"NASA PSI — Open Data Repository on AWS", publisher:"NASA / AWS Registry of Open Data", type:"Open-data catalogue", date:"Live page", url:"https://registry.opendata.aws/nasa-psi/", note:"Alternative discovery route for PSI public data."},
    {id:"S28", title:"Researcher’s Guide to the Physical Sciences Informatics System", publisher:"NASA", type:"Research guide", date:"08 Nov 2018", url:"https://www.nasa.gov/science-research/for-researchers/researchers-guide-to-physical-sciences-informatics-system/", note:"Researcher-oriented guide to PSI."},
    {id:"S29", title:"Material Flammability at Lunar and Martian Gravity", publisher:"NASA NTRS", type:"Conference presentation", date:"2026", url:"https://ntrs.nasa.gov/citations/20260001966", note:"Related research context distinct from the supplied PSI archive."}
  ],
  investigations: [
    {
      id:"spice", title:"Smoke Point in Co-flow Experiment", acronym:"SPICE", psi:"PSI-107", topic:"Soot formation / gaseous diffusion flames", family:"Gaseous flame", gravity:"Microgravity (~0 g)", platform:"ISS · Microgravity Science Glovebox (MSG)", hardware:"Round-jet burner with coflow; SPICE flow duct", evidence:"A", dataStatus:"Partial source package", statusTone:"partial",
      summary:"Measured smoke-point properties of non-buoyant round-jet diffusion flames under coflowing-air conditions. Fuel type, burner diameter, and coflow velocity are essential comparison variables.",
      value:"Provides a traceable fuel–burner–flow record relevant to soot tendency and smoke-related instrumentation. It is not a direct cabin-smoke concentration measurement.",
      variables:["Fuel / fuel mixture","Burner diameter: 0.4064, 0.764, 1.600 mm","Coflow velocity: approx. 5.4–65 cm/s","Fuel flow and luminous flame length","Outlet-screen condition / blockage"],
      measured:["Smoke-point outcome","Luminous flame length","Video / still-image-derived flame metrics"],
      limitations:["Smoke point is not soot mass-generation rate, particle count, or cabin smoke concentration.","Empirical fit applies only to tested fuels, geometry, and flow range.","52 and 55 smoke-point counts are source-specific; 263 is a different test-point count.","Uploaded project files did not include full SPICE flight video/images for independent re-extraction."],
      relevance:{lunar:78,materials:38,detection:76,suppression:12,modeling:92,habitat:78},
      coverage:65, metadata:82, links:["S02","S21","S22"],
      facts:["Dotson thesis / conference table: 52 smoke points.","Peer-reviewed Fire Safety Journal paper: 55 smoke points.","Post-flight report: 108 + 155 = 263 test points; different measurement count."],
      audit:"Source counts preserved by publication and definition; never summed together."
    },
    {
      id:"bass2", title:"Burning and Suppression of Solids-II", acronym:"BASS-II", psi:"PSI-25", topic:"Solid-material ignition / flame spread", family:"Solid fuel", gravity:"Microgravity (~0 g)", platform:"ISS · Microgravity Science Glovebox (MSG)", hardware:"Modular fan-driven flow duct; sample holder", evidence:"A", dataStatus:"Reports verified; raw-data gap", statusTone:"partial",
      summary:"Investigated ignition, flame growth, flame spread, and extinction limits of solid fuels in low-velocity forced flows under microgravity conditions.",
      value:"One of the closest evidence families for material selection and flame-spread questions in a crewed habitat, subject to material- and configuration-specific limits.",
      variables:["Polymer / sample identity","Sample shape, thickness, and orientation","Preheating / thermal history","Oxygen environment","Forced-flow velocity and direction"],
      measured:["Ignition and sustained burning observations","Flame growth / spread behaviour","Extinction observations"],
      limitations:["No universal airflow threshold follows from these tests.","A result for one specimen geometry or polymer is not a blanket material certification.","Raw BASS data were not supplied in the user-uploaded package."],
      relevance:{lunar:96,materials:100,detection:20,suppression:48,modeling:91,habitat:96},
      coverage:60, metadata:78, links:["S03","S12","S13","S11"],
      facts:["Reviewed BASS-II materials describe airflow up to approximately 53 cm/s.","Some reported configurations retained a faint blue flame below 1 cm/s.","Sample geometry, thickness, preheating, oxygen fraction, and flow direction remain critical."],
      audit:"The supplied inventory marks BASS-II summary report and engineering requirements as verified; raw BASS data remain pending verification."
    },
    {
      id:"saffire", title:"Spacecraft Fire Safety Demonstration", acronym:"SAFFIRE I–VI", psi:"PSI-98 / PSI-99 / PSI-100 (I–III)", topic:"Vehicle-scale fire behaviour", family:"Solid fuel / vehicle-scale", gravity:"Microgravity / spacecraft free-fall", platform:"Uncrewed Cygnus cargo vehicle after ISS departure", hardware:"Vehicle-scale test enclosure, fans, cameras, telemetry", evidence:"A", dataStatus:"PSI records; raw flight files not in upload", statusTone:"partial",
      summary:"A series of large-scale spacecraft fire experiments designed to observe flame spread, material burning, and fire dynamics in a vehicle-relevant enclosure without an occupied crew cabin.",
      value:"Bridges the scale gap between small laboratory samples and spacecraft-scale fire behaviour. Particularly valuable for system-level modelling, while remaining distinct from an occupied habitat.",
      variables:["Sample material and orientation","Vehicle / duct geometry","Fan and ventilation configuration","Oxygen concentration and flow","Mission iteration and event timing"],
      measured:["Flame behaviour and spread","Video-derived observations","Vehicle-scale fire and environment observations"],
      limitations:["Experiments were conducted in an uncrewed cargo vehicle, not an occupied cabin.","No SAFFIRE flight videos were included in the supplied upload.","Series iterations must remain separately identified; do not collapse I–VI into one run."],
      relevance:{lunar:84,materials:88,detection:90,suppression:35,modeling:96,habitat:96},
      coverage:48, metadata:76, links:["S04","S14","S15"],
      facts:["NASA reported the final SAFFIRE mission, SAFFIRE VI, concluded in January 2024.","Series is relevant to vehicle-scale geometry, ventilation, and fire observations."],
      audit:"PSI-98 is the SAFFIRE-I record; PSI-99 and PSI-100 are related records, not alternative names for the same dataset."
    },
    {
      id:"samer", title:"Smoke Aerosol Measurement Experiment — Reflight", acronym:"SAME-R", psi:"PSI-101", topic:"Smoke aerosols / detector relevance", family:"Aerosol diagnostics", gravity:"Microgravity (~0 g)", platform:"ISS", hardware:"SAME hardware; M-PASS and aerosol diagnostics", evidence:"A", dataStatus:"PSI record; project upload has cited report only", statusTone:"record",
      summary:"Characterised aerosol particles from heated / pyrolysing spacecraft-relevant materials and examined how particle-size distributions relate to smoke generation and transport in low gravity.",
      value:"Directly informs the measurement side of fire safety: aerosol source, transport, particle properties, and detector response are separate but connected questions.",
      variables:["Material class (including polymers / foams)","Heating temperature","Airflow and no-flow periods","Aerosol dilution and measurement method","Particle-size distribution assumptions"],
      measured:["Particle-size moments / distributions","Aerosol characteristics","Transport and detector-relevant observations"],
      limitations:["Aerosols from overheated materials are not necessarily soot from a flaming hydrocarbon flame.","Moment-based estimates depend on distribution assumptions and instrument ranges.","Do not generalise a single size range to all smoke sources."],
      relevance:{lunar:76,materials:22,detection:100,suppression:8,modeling:78,habitat:94},
      coverage:58, metadata:85, links:["S05","S16","S26","S15"],
      facts:["NASA PSI record describes 66 completed SAME-R flight test points.","M-PASS was used in SAME-R in place of one of the diagnostic enclosures."],
      audit:"The supplied review cites the SAME-R final report; raw particle time-series were not included in the two supplied PDFs."
    },
    {
      id:"flex", title:"Flame Extinguishment Experiment", acronym:"FLEX", psi:"PSI-69", topic:"Liquid-droplet combustion / extinction", family:"Liquid droplet", gravity:"Microgravity (~0 g)", platform:"ISS · Combustion Integrated Rack (CIR)", hardware:"Multi-user Droplet Combustion Apparatus (MDCA)", evidence:"A", dataStatus:"PSI record; supporting review", statusTone:"record",
      summary:"Studied burning liquid droplets, extinction behaviour, limiting oxygen conditions, and the effects of gaseous diluents / suppressants in microgravity.",
      value:"Provides mechanistic evidence about droplet combustion and extinction. It is relevant to suppression science, but is not a direct substitute for solid-polymer flame-spread data.",
      variables:["Liquid fuel and initial droplet diameter","Ambient pressure and oxygen fraction","Inert / suppressant gas composition","Droplet motion and imposed low-speed flow"],
      measured:["Droplet burning behaviour","Extinction diameter / extinction observations","Temperature and radiative measurements where available"],
      limitations:["Droplet geometry and vaporisation differ from solid-material fires.","Do not transfer an extinction observation directly to fabrics, cables, or polymer panels.","Suppressant comparisons must remain linked to the reported gas mixture and pressure."],
      relevance:{lunar:60,materials:18,detection:20,suppression:100,modeling:88,habitat:72},
      coverage:72, metadata:86, links:["S06","S23","S24","S25"],
      facts:["NASA PSI FLEX record lists CO₂, helium, and SF₆ among studied gaseous suppressants.","FLEX hardware is the MDCA in the Combustion Integrated Rack."],
      audit:"Strong mechanistic relevance for droplet extinction; limited transferability to solid-fuel fire spread."
    },
    {
      id:"flex2", title:"Flame Extinguishment Experiment-2", acronym:"FLEX-2", psi:"PSI-70 (as cited in supplied inventory)", topic:"Droplet burning / extinction", family:"Liquid droplet", gravity:"Microgravity (~0 g)", platform:"ISS · CIR", hardware:"MDCA", evidence:"A", dataStatus:"NTRS reference; PSI file set not audited here", statusTone:"partial",
      summary:"Follow-on droplet-combustion work supporting understanding of flame extinguishment and low-temperature combustion behaviour in microgravity.",
      value:"Extends the droplet evidence family and offers material for combustion-model comparisons when test definitions and datasets are traced to their own versions.",
      variables:["Fuel droplet composition and size","Ambient gas composition","Pressure","Flow / thermal conditions"],
      measured:["Droplet combustion / extinction observations","Condition-dependent combustion response"],
      limitations:["Do not merge FLEX and FLEX-2 data without run-level condition matching.","The uploaded research package does not contain a complete FLEX-2 raw-data analysis."],
      relevance:{lunar:55,materials:14,detection:14,suppression:88,modeling:82,habitat:65},
      coverage:42, metadata:68, links:["S23","S01"],
      facts:["The supplied review references NASA NTRS document 20210022617 for FLEX-2."],
      audit:"FLEX-2 is shown as a separate investigation to avoid conflating its test matrix with FLEX."
    },
    {
      id:"cfig", title:"ACME Cool Flames Investigation with Gases", acronym:"CFI-G", psi:"PSI-159", topic:"Gaseous cool flames / diffusion", family:"Gaseous flame", gravity:"Microgravity (~0 g)", platform:"ISS · Combustion Integrated Rack (CIR)", hardware:"ACME spherical burner / modular ACME hardware", evidence:"B / C", dataStatus:"Selected raw files analysed; metadata incomplete", statusTone:"partial",
      summary:"Examined cool diffusion flames for gaseous fuels including propane, n-butane, and n-pentane under varied dilution, flow, and pressure conditions.",
      value:"Offers high-value combustion-physics data and selected high-oxygen test conditions relevant to understanding how composition can change flame regimes. It is not a cabin-level fire test.",
      variables:["Fuel gas and dilution","Pressure and flow rate","Normal / inverse flame configuration","Burner oxidiser mixture","Test-point and channel identifiers"],
      measured:["Flame / sensor time series","MFC setpoint records","Camera metadata","Selected raw channel values"],
      limitations:["PSI-159 channel dictionary and calibration package were not supplied.","MFC voltages must not be converted to SCCM / SLPM without channel- and gas-specific calibration.","PMT, thermocouple, radiometer, and similar channels must not be interpreted as engineering quantities without definitions.","The 85% oxygen figure in the challenge context refers to a burner feed mixture, not a habitat atmosphere."],
      relevance:{lunar:82,materials:22,detection:12,suppression:24,modeling:100,habitat:66},
      coverage:68, metadata:42, links:["S07","S01"],
      facts:["Selected A4 file: 7,749 numeric samples over 61.985 s; median interval ~8 ms.","Selected B1 file: 9,627 samples over 76.996 s; one -5 ms timestamp reversal.","Three setpoint files retain voltage values; no calibration conversion is applied."],
      audit:"Reanalysis grade C is limited to the selected uploaded files; missing units, channel definitions, and calibrations remain explicit."
    },
    {
      id:"psi142", title:"Cool Flames — PSI-142 Summary Data", acronym:"CFI summary", psi:"PSI-142", topic:"Cool-flame chemistry / summary workbook", family:"Gaseous flame", gravity:"Not fully specified in supplied workbook summary", platform:"Source-specific records; verify against original publications", hardware:"Not harmonised across Data IDs", evidence:"C", dataStatus:"Summary CSV / workbook only; raw files absent", statusTone:"partial",
      summary:"The supplied appendix examines eight Data IDs from a summary CSV and workbook, covering cool-flame extinction, high-temperature extinction, PLIF / thermometry, and chemiluminescence.",
      value:"Useful for publication-to-data cross-referencing and for selected descriptive plots. It also demonstrates why metadata conflicts must remain visible in a research platform.",
      variables:["Data ID and worksheet","Fuel groups (including nC7–nC14)","Workbook-labelled conditions","Spatial position and signal fields for selected IDs"],
      measured:["Selected workbook ranges and plotted series","PLIF signal / thermometry summaries","Chemiluminescence and Tmax summaries"],
      limitations:["Data ID 1 and 2 ozone descriptions conflict between CSV and Excel.","Data ID 6 column mapping is ambiguous and is not plotted.","Some workbook fields lack sufficient physical unit / definition to interpret them.","Underlying raw PSI-142 dataset was not supplied."],
      relevance:{lunar:46,materials:4,detection:8,suppression:14,modeling:84,habitat:38},
      coverage:40, metadata:45, links:["S01","S24","S25"],
      facts:["Data IDs 1–8 are cross-referenced in the supplied appendix.","Data ID 5 includes 249 PLIF points per listed group and separate thermometry series.","Data ID 8 reports Tmax ranges by workbook condition; labels are preserved as given."],
      audit:"Plots and summary tables must be keyed by Data ID. The system does not select one conflicting ozone label as correct."
    },
    {
      id:"sofiegel", title:"Solid Fuel Ignition and Extinction — Growth and Extinction Limit", acronym:"SoFIE-GEL", psi:"NASA Science investigation page", topic:"Solid-material ignition / growth / extinction", family:"Solid fuel", gravity:"Microgravity (~0 g)", platform:"ISS · Combustion Integrated Rack (CIR)", hardware:"PMMA spherical sample configuration", evidence:"B", dataStatus:"NASA investigation page; not in supplied PSI files", statusTone:"external",
      summary:"Studies flame growth and extinction over a thick PMMA sphere as functions of flow velocity, oxygen percentage, pressure, and internal sample heating.",
      value:"Highly relevant to material flammability and to linking controlled microgravity experiments with predictive models and terrestrial baselines.",
      variables:["PMMA sphere geometry","Flow velocity","Oxygen percentage","Pressure","Internal heating / thermal state"],
      measured:["Flame growth rate, shape, and dimensions","Extinction behaviour","Model-to-experiment comparison"],
      limitations:["A PMMA sphere is not representative of every cable, fabric, foam, or panel.","Microgravity results need mission-specific boundary-condition matching before lunar transfer."],
      relevance:{lunar:90,materials:100,detection:20,suppression:62,modeling:92,habitat:92},
      coverage:52, metadata:84, links:["S08","S11"],
      facts:["NASA describes the sample as a PMMA sphere.","The NASA page describes testing as a function of flow velocity, oxygen percentage, pressure, and sample internal heating."],
      audit:"NASA Science page is used as an investigation description; no raw SoFIE dataset was present in the two supplied PDFs."
    },
    {
      id:"sofiemist", title:"Solid Fuel Ignition and Extinction — Material Ignition and Suppression Test", acronym:"SoFIE-MIST", psi:"NASA Science investigation page", topic:"Solid-material ignition / suppression", family:"Solid fuel", gravity:"Microgravity (~0 g)", platform:"ISS · Combustion Integrated Rack (CIR)", hardware:"PMMA cylindrical sample configuration", evidence:"B", dataStatus:"NASA investigation page; not in supplied PSI files", statusTone:"external",
      summary:"Studies thermally assisted burning of a PMMA cylinder while varying airflow, oxygen concentration, pressure, and external radiant flux.",
      value:"Connects material ignition thresholds and early fire growth to suppression-relevant research questions under space-exploration atmospheres.",
      variables:["PMMA cylinder geometry","Airflow speed","Oxygen concentration","Pressure","External radiant flux"],
      measured:["Ignition / extinction boundaries","Thermally assisted burning response","Condition-dependent material flammability"],
      limitations:["Different geometry and test purpose from SoFIE-GEL; do not merge as one identical test matrix.","A programme objective is not the same as a published measured result."],
      relevance:{lunar:95,materials:100,detection:18,suppression:88,modeling:90,habitat:95},
      coverage:45, metadata:82, links:["S09","S11"],
      facts:["NASA page identifies a PMMA cylinder and varying flow, oxygen, pressure, and radiant flux."],
      audit:"Current NASA page is used for intended variables; the supplied research review says the SoFIE sub-investigations have distinct sample geometries and objectives."
    },
    {
      id:"fm2", title:"Flammability of Materials on the Moon", acronym:"FM²", psi:"NASA programme / mission page; not a PSI result record", topic:"Lunar partial-gravity material flammability", family:"Solid fuel", gravity:"Lunar gravity (~1/6 g) target", platform:"Lunar surface experiment concept", hardware:"Sealed autonomous test chamber; cameras and environmental sensors", evidence:"B (programme description)", dataStatus:"External programme context; results not in supplied PSI upload", statusTone:"external",
      summary:"NASA describes FM² as a lunar-gravity combustion investigation intended to observe flame spread and material flammability under lunar-relevant conditions.",
      value:"Defines the key future evidence gap for transferring ISS microgravity results to an actual lunar habitat environment.",
      variables:["Fuel sample identity / orientation","Lunar gravity environment","Habitat-relevant pressure and gas composition","Oxygen and carbon-dioxide concentration","Flame imaging and temperature measurements"],
      measured:["Intended measurements include flame size, intensity, colour, spread rate, and sample / gas temperatures"],
      limitations:["Do not treat programme objectives as completed flight results.","No FM² raw result set was among the uploaded PSI files.","Keep terrestrial partial-gravity simulations separate from an actual lunar-surface experiment."],
      relevance:{lunar:100,materials:100,detection:18,suppression:25,modeling:96,habitat:100},
      coverage:22, metadata:58, links:["S10","S20","S29"],
      facts:["NASA describes FM² as intended to test material burning at approximately 1/6 g.","The supplied challenge notes that partial-gravity combustion data were not available in PSI at its stated baseline."],
      audit:"Programme context only. The atlas does not claim that NASA has published a complete lunar-gravity dataset in PSI."
    },
    {
      id:"acmebre", title:"Advanced Combustion via Microgravity Experiments — Burning Rate Emulator", acronym:"ACME-BRE", psi:"PSI-20 (as cited in supplied inventory)", topic:"Material-property / burning-rate emulator", family:"Gaseous flame / material analogue", gravity:"Microgravity investigation family", platform:"ISS · Combustion Integrated Rack (CIR)", hardware:"ACME modular hardware", evidence:"B", dataStatus:"Collection priority; raw data not supplied", statusTone:"pending",
      summary:"The challenge identifies BRE as a gaseous-fuel study of material flammability in still atmospheres as a function of material properties.",
      value:"Potentially bridges gaseous-flame experiments and material-flammability model inputs; relevant to predictive work when source metadata are obtained.",
      variables:["Material-property representation","Still-atmosphere conditions","Gas fuel / burner variables"],
      measured:["Burning-rate-emulator responses (source dataset required)"],
      limitations:["Challenge description is not a substitute for the full PSI record and data files.","The supplied inventory marks underlying coflow / BRE data as pending."],
      relevance:{lunar:60,materials:70,detection:8,suppression:10,modeling:88,habitat:55},
      coverage:24, metadata:40, links:["S01","S17"],
      facts:["ACME-BRE is named in NASA's combustion-science research-area catalogue."],
      audit:"Show as a targeted data-acquisition priority until the actual record files and test conditions are verified."
    },
    {
      id:"efield", title:"ACME Electric-Field Effects on Laminar Diffusion Flames", acronym:"E-FIELD Flames", psi:"PSI-38 (as cited in supplied inventory)", topic:"Flame structure / electric-field effects", family:"Gaseous flame", gravity:"Microgravity investigation family", platform:"ISS · CIR / ACME hardware", hardware:"ACME modular hardware", evidence:"B", dataStatus:"Collection priority; raw data not supplied", statusTone:"pending",
      summary:"Examines how electric fields influence ions naturally present in flames, offering a way to study flame response that is relevant to transport and reduced-gravity interpretation.",
      value:"Useful as supporting physical evidence and model context, but not direct partial-gravity testing or a solid-material safety test.",
      variables:["Applied electric field","Flame configuration","Fuel and oxidiser flow","Diagnostic conditions"],
      measured:["Flame response / structure under electric-field conditions"],
      limitations:["Electric-field effects are not equivalent to lunar gravity.","The supplied priority inventory marks the raw dataset as pending."],
      relevance:{lunar:52,materials:18,detection:8,suppression:15,modeling:84,habitat:38},
      coverage:22, metadata:42, links:["S07","S17"],
      facts:["The supplied challenge lists E-FIELD Flames as a partial-gravity mimic through ion response to electric fields."],
      audit:"Keep the analogy explicit: electrical forcing does not reproduce the full lunar-gravity flow field."
    },
    {
      id:"daft", title:"Dust and Aerosol Measurement Feasibility Tests", acronym:"DAFT / DAFT-2", psi:"Identifier mapping unresolved", topic:"Aerosol / dust sensing", family:"Aerosol diagnostics", gravity:"Microgravity investigation family", platform:"ISS", hardware:"Aerosol measurement instrument also used in SAME / SAME-R context", evidence:"B", dataStatus:"Named in catalogue; identifier conflict in supplied inventory", statusTone:"conflict",
      summary:"Related aerosol / dust investigations are relevant to understanding how background dust may complicate smoke measurement and alarm interpretation.",
      value:"Supports a more rigorous separation of smoke-source signals from dust and other ambient aerosols where instrument capabilities permit.",
      variables:["Dust / aerosol source","Particle properties","Instrument configuration","Background concentration and flow"],
      measured:["Aerosol / dust sensing feasibility"],
      limitations:["The supplied inventory associates DAFT/DAFT-2 with PSI-107/108, but the current NASA PSI record identifies PSI-107 as SPICE.","No DAFT raw data were included in the supplied PDFs.","Do not use the disputed PSI identifier as a direct link until resolved."],
      relevance:{lunar:65,materials:5,detection:92,suppression:4,modeling:60,habitat:68},
      coverage:15, metadata:28, links:["S01","S17"],
      facts:["NASA's combustion-science catalogue lists DAFT and DAFT-2 as named investigations.","PSI-107 is officially labelled SPICE in the current NASA PSI record."],
      audit:"Identifier conflict surfaced across supplied inventory and official repository. This record intentionally carries no guessed PSI ID."
    },
    {
      id:"slice", title:"Structure and Liftoff in Combustion Experiment", acronym:"SLICE", psi:"PSI-158 (as cited in supplied inventory)", topic:"Solid-fuel / gaseous-flame structure", family:"Solid and gaseous fuel", gravity:"Microgravity (~0 g)", platform:"ISS · Microgravity Science Glovebox (MSG)", hardware:"Modular fan-driven flow duct", evidence:"B", dataStatus:"Collection priority; raw data not supplied", statusTone:"pending",
      summary:"A supporting investigation named in the supplied challenge resources, associated with flame structure and liftoff in a flow-duct experiment context.",
      value:"Could support comparisons of flame response to forced flow and test geometry once its record and data are acquired.",
      variables:["Fuel / sample type","Fan-driven flow","Duct geometry","Flame structure and liftoff"],
      measured:["Flame structure / liftoff observations (files required)"],
      limitations:["The supplied upload contains no SLICE raw data.","Do not assume all reported flow / sample configurations are shared across experiments without checking run metadata."],
      relevance:{lunar:68,materials:68,detection:10,suppression:18,modeling:75,habitat:58},
      coverage:18, metadata:35, links:["S01","S17"],
      facts:["SLICE is listed among NASA's combustion-science investigation names."],
      audit:"Treat as a pending source-acquisition item, not a verified quantitative result."
    }
  ],
  spiceCounts: [
    {fuel:"Ethylene (C₂H₄)", short:"Ethylene", count:6, diameter:"0.76–1.60", flow:"18–58", length:"37–105"},
    {fuel:"Propane (C₃H₈)", short:"Propane", count:6, diameter:"0.76–1.60", flow:"16–45", length:"46–105"},
    {fuel:"Propylene (C₃H₆)", short:"Propylene", count:20, diameter:"0.41–1.60", flow:"5.4–57", length:"13–59"},
    {fuel:"75% propylene / 25% N₂", short:"75/25 mix", count:13, diameter:"0.76–1.60", flow:"13–65", length:"15–44"},
    {fuel:"50% propylene / 50% N₂", short:"50/50 mix", count:7, diameter:"0.76–1.60", flow:"11–49", length:"22–50"}
  ],
  psi159: {
    records:[
      {id:"21256A4", samples:7749, elapsed:61.985, start:"17:29:29.799", end:"17:30:31.784", medianInterval:8, anomalies:0},
      {id:"21256B1", samples:9627, elapsed:76.996, start:"19:29:53.585", end:"19:31:10.581", medianInterval:8, anomalies:1}
    ],
    channels:[
      {name:"MFCA1StaticMixerFlow", a4:0.013016, a4p05:-0.000955, a4p95:0.721482, b1:2.935130, b1p05:-0.041012, b1p95:2.943380},
      {name:"MFCA3FuelFlow", a4:0.002861, a4p05:0.000954, a4p95:0.005760, b1:0.005531, b1p05:0.002861, b1p95:0.008431},
      {name:"EfieldVoltage", a4:0.405695, a4p05:null, a4p95:null, b1:0.418817, b1p05:null, b1p95:null}
    ],
    setpoints:[
      {test:"A4", channel:"MFCA1", volts:0.740000, note:"Three repeated rows"},
      {test:"C1", channel:"MFCA1", volts:2.950001, note:"One non-zero setpoint row"},
      {test:"C1", channel:"MFCA2", volts:0.203000, note:"Three non-zero setpoint rows"},
      {test:"H5", channel:"MFCA1", volts:4.920001, note:"Three repeated rows"}
    ],
    caution:"These are source-column statistics and recorded controller voltages. The upload has no complete channel dictionary or MFC calibration package; do not convert to flow units or assign physical meaning beyond documented column labels."
  },
  psi142: {
    ids:[
      {id:1, topic:"Cool-flame extinction (CFE)", status:"Ozone label conflict", note:"CSV and Excel reverse the with/without ozone descriptions."},
      {id:2, topic:"Cool-flame extinction (CFE)", status:"Ozone label conflict", note:"CSV and Excel reverse the with/without ozone descriptions."},
      {id:3, topic:"Predicted vs measured CFE / HFE", status:"Selected values plotted", note:"Workbook ranges available by fuel group."},
      {id:4, topic:"DME / O₂ / O₃ CFE and HFE", status:"Partially interpretable", note:"Column a unit/meaning is not established."},
      {id:5, topic:"CH₂O PLIF and thermometry", status:"Selected values plotted", note:"Signal and temperature series are summarised in the workbook."},
      {id:6, topic:"nC7 / nC10 / nC12 chemiluminescence", status:"Not plotted", note:"Workbook column mapping is ambiguous."},
      {id:7, topic:"nC12 chemiluminescence", status:"Selected values plotted", note:"Three Xf conditions with 966 points each."},
      {id:8, topic:"nC12 maximum temperature", status:"Selected values plotted", note:"Ranges are grouped by workbook condition labels."}
    ],
    data5:[
      {label:"PLIF · O₃=0.0 mol.%", n:249, min:9.56, max:366.55, unit:"a.u."},
      {label:"PLIF · O₃=4.1 mol.%", n:249, min:10.09, max:261.41, unit:"a.u."},
      {label:"Temperature · O₃=0.0 mol.%", n:23, min:311, max:657, unit:"K"},
      {label:"Temperature · O₃=4.5 mol.%", n:27, min:312, max:788, unit:"K"}
    ],
    data8:[
      {label:"550 · O₃", n:3, min:767, max:814},
      {label:"550 · no O₃", n:3, min:731, max:751},
      {label:"600 · O₃", n:4, min:762, max:809},
      {label:"600 · no O₃", n:4, min:742, max:758}
    ]
  },
  audits: [
    {level:"Critical metadata conflict", title:"PSI-107 identifier collision", detail:"The supplied priority inventory associates DAFT / DAFT-2 with PSI-107/108, while NASA's current PSI-107 page identifies PSI-107 as SPICE. LFAEA keeps DAFT IDs unresolved and does not create a guessed link.", refs:["S02","S17"]},
    {level:"Publication-count discrepancy", title:"SPICE 52 vs 55 smoke points", detail:"The thesis / conference count is 52; the peer-reviewed article reports 55. These counts are stored by source/version and are not added together. The 263 post-flight test points are another count type.", refs:["S21","S22"]},
    {level:"Unresolved worksheet labels", title:"PSI-142 Data IDs 1–2", detail:"The uploaded CSV and Excel workbook reverse the ozone descriptions. Plots are keyed by Data ID only until the original publication or corrected dictionary resolves the discrepancy.", refs:["S01"]},
    {level:"Unresolved channel semantics", title:"PSI-159 calibration and units", detail:"MFC voltage setpoints and raw channels remain in source units. A gas-code lookup, full channel dictionary, and channel-/gas-specific calibration curves are missing.", refs:["S07"]},
    {level:"Dataset coverage gap", title:"Selected files are not the complete PSI inventory", detail:"The uploaded project covers selected SPICE, PSI-159, and PSI-142 files. SAFFIRE videos, raw BASS data, raw PSI-142 data, and DAFT / SLICE files were not supplied.", refs:["S01","S03","S04"]},
    {level:"Gravity-transfer gap", title:"Do not label ISS tests as lunar-gravity tests", detail:"Microgravity evidence is not direct 1/6 g evidence. The challenge baseline notes partial-gravity data are not present in PSI; related NASA lunar-gravity research is shown separately from PSI records.", refs:["S10","S20","S29"]}
  ]
};
