## 🚀 Overview

This PR replaces the static/mock video data layer with a dynamic, API-driven architecture using TMDB. It introduces category-based browsing and a modal preview system to improve user interaction and scalability.

---

## ✨ Key Changes

### 1. TMDB Integration

- Integrated TMDB API for fetching real movie data
- Replaced local mock video backend with live API-driven content
- Introduced endpoint-based fetching for different categories

### 2. Dynamic Video Rows

- Refactored `VideoRow` component to be fully API-driven
- Added support for multiple categories:
  - Trending
  - Top Rated
  - Action Movies
  - Comedy Movies
- Improved horizontal scrolling layout and responsiveness

### 3. Modal-Based Preview UI

- Implemented centralized modal for movie preview
- Displays:
  - Backdrop image
  - Title
  - Overview
- Added action buttons:
  - ▶ Play
  - - My List
- Added backdrop blur and click-outside-to-close behavior

### 4. Codebase Improvements

- Removed unused mock fetching logic
- Simplified state management in `Home` component
- Improved component reusability and separation of concerns

---

## 🧠 Architecture Changes

```text
Before:
Static mock data → passed via props

After:
TMDB API → fetched inside VideoRow → dynamic rendering
```

temp readme (WIP)
