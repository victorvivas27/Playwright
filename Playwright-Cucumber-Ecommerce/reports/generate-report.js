import reporter from 'cucumber-html-reporter';
import fs from 'fs';
import path from 'path';


// Función para adjuntar videos a reportes
function attachVideosToReport() {
  const videosDir = 'reports/videos/';
  const videos = [];

  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir)
      .filter(file => file.endsWith('.webm'))
      .map(file => ({
        name: file,
        path: path.join(videosDir, file),
        size: fs.statSync(path.join(videosDir, file)).size
      }));

    videos.push(...videoFiles);
  }

  return videos;
}

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "QA",
    "Browser": "Chromium",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote",
    "Videos Recorded": attachVideosToReport().length.toString(),
    "Video Directory": "reports/videos/"
  }
};

reporter.generate(options);
