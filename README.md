# Simple Streaming Service

Website where users can listen to audio files. For now, files are hosted locally.

Project is still in progress.

Planned features:
- Ability to queue up songs
- Shuffle queue
- Host files remotely with S3 and CloudFront
- Buffered playback from S3/CloudFront instead of having to download entire file
- Adaptive bitrate streaming based on user connection speed
- Basic authentication
- Automated way to find and download song files
- Automated way to compress audio files
- Look into different streaming protocols like HLS, RTP, DASH, etc
- Optimization to do least amount of work on client side as possible

To run:
```bash
cd sss
npm install
npn run dev
```

Built with React, Typescript, Vite.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
