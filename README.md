# PrivacyPixel 🛡️

**Block email tracking pixels and see who's spying on you.**

A Chrome/Firefox extension that blocks email tracking pixels and shows you which companies are tracking your email opens.

## Features

- 🛡️ Blocks email tracking pixels automatically
- 👁️ Shows which companies are tracking you
- 📊 Real-time tracker count
- 🔔 Notifications when trackers are blocked
- 🎨 Beautiful, privacy-focused UI
- ⚡ Lightweight and fast

## How It Works

PrivacyPixel blocks:
1. **Known tracking domains** (Mailchimp, SendGrid, HubSpot, etc.)
2. **1x1 pixel images** (invisible tracking pixels)
3. **Common tracking endpoints** (/track, /pixel, /open)

## Installation

### Chrome
1. Download or clone this repo
2. Open Chrome → Extensions → Enable Developer Mode
3. Click "Load unpacked" → Select the `privacypixel` folder
4. Done! The shield icon appears in your toolbar

### Firefox
Coming soon!

## Usage

1. Click the PrivacyPixel icon in your toolbar
2. See how many trackers have been blocked
3. View recent tracking attempts
4. Clear stats anytime

## Privacy

- **No data collection** - Everything stays on your device
- **No external servers** - All blocking happens locally
- **Open source** - Audit the code yourself

## Development

```bash
git clone https://github.com/codebyjawad/privacypixel
cd privacypixel
# Load in Chrome as unpacked extension
```

## Tech Stack

- Manifest V3 (latest Chrome extension standard)
- Vanilla JavaScript (no frameworks)
- Chrome Storage API
- WebRequest API for blocking

## Roadmap

- [ ] Firefox support
- [ ] Historical tracking data (Pro)
- [ ] Export reports (Pro)
- [ ] Custom blocking rules
- [ ] Company database with logos
- [ ] Real-time notifications

## Pro Version (Coming Soon)

**Price:** $4.99/month or $29/year

**Features:**
- Historical tracking data (unlimited)
- Export reports (CSV, PDF)
- Block by company
- Advanced analytics
- Priority support

## License

MIT © [Jawad](https://codebyjawad.com)

## Links

- Website: [makeworking.com/privacypixel](https://makeworking.com/privacypixel)
- GitHub: [github.com/codebyjawad/privacypixel](https://github.com/codebyjawad/privacypixel)
- Twitter: [@jawad](https://twitter.com/jawad)

---

**Made with ❤️ for privacy**
