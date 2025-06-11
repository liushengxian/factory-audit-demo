import { create } from 'zustand';

interface Video {
  id: string;
  url: string;
  title: string;
  timestamp?: string;
  location?: string;
  status?: string;
  streamStatus?: 'active' | 'paused' | 'error';
  resolution?: string;
}

// Default videos data
const DEFAULT_MAIN_VIDEO: Video = {
  id: 'main-default',
  url: 'https://misanya-1252867445.cos.ap-shanghai.myqcloud.com/videos/v1.mp4',
  title: 'Production Line A',
  timestamp: new Date().toISOString(),
  streamStatus: 'active',
  resolution: '1920x1080'
};

// Default grid videos
const DEFAULT_GRID_VIDEOS: Video[] = Array.from({ length: 6 }, (_, i) => ({
  id: `cam-${i + 1}`,
  title: `Camera ${String.fromCharCode(65 + i)}`,
  url: `https://misanya-1252867445.cos.ap-shanghai.myqcloud.com/videos/v${i + 2}.mp4`,
  location: `Section ${i + 1}`,
  status: i === 5 ? 'offline' : 'online',
  streamStatus: i === 5 ? 'error' : 'active',
  resolution: '1280x720',
  timestamp: new Date().toISOString()
}));

interface VideoState {
  currentVideo: Video | null;
  gridVideos: Video[];
  previousMainVideo: Video | null;
  setCurrentVideo: (video: Video) => void;
  setGridVideos: (videos: Video[]) => void;
  addGridVideo: (video: Video) => void;
  removeGridVideo: (videoId: string) => void;
  clearGridVideos: () => void;
  swapWithMainVideo: (gridVideoId: string) => void;
  resetVideos: () => void;
  updateVideoStreamStatus: (videoId: string, status: 'active' | 'paused' | 'error') => void;
  getAvailableVideos: () => Video[];
}

export const useVideoStore = create<VideoState>((set, get) => ({
  currentVideo: DEFAULT_MAIN_VIDEO,
  gridVideos: DEFAULT_GRID_VIDEOS,
  previousMainVideo: null,
  
  setCurrentVideo: (video) => set({ currentVideo: video }),
  
  setGridVideos: (videos) => set({ gridVideos: videos }),
  
  addGridVideo: (video) => set((state) => ({
    gridVideos: [...state.gridVideos, video]
  })),
  
  removeGridVideo: (videoId) => set((state) => ({
    gridVideos: state.gridVideos.filter(video => video.id !== videoId)
  })),
  
  clearGridVideos: () => set({ gridVideos: [] }),
  
  swapWithMainVideo: (gridVideoId) => {
    const state = get();
    const gridVideo = state.gridVideos.find(video => video.id === gridVideoId);
    
    if (!gridVideo || !state.currentVideo) return;
    
    // Create a copy of the current main video to place in the grid
    const previousMain = { ...state.currentVideo };
    
    // Find the index of the grid video to replace
    const gridIndex = state.gridVideos.findIndex(video => video.id === gridVideoId);
    if (gridIndex === -1) return;
    
    // Create a new array with the main video replacing the grid video
    const updatedGridVideos = [...state.gridVideos];
    updatedGridVideos[gridIndex] = previousMain;
    
    set({ 
      currentVideo: gridVideo, 
      gridVideos: updatedGridVideos,
      previousMainVideo: previousMain
    });
  },
  
  resetVideos: () => set({
    currentVideo: DEFAULT_MAIN_VIDEO,
    gridVideos: DEFAULT_GRID_VIDEOS,
    previousMainVideo: null
  }),
  
  updateVideoStreamStatus: (videoId, status) => {
    const state = get();
    
    // Check if it's the current video
    if (state.currentVideo && state.currentVideo.id === videoId) {
      set({
        currentVideo: {
          ...state.currentVideo,
          streamStatus: status
        }
      });
      return;
    }
    
    // Check if it's in grid videos
    const gridIndex = state.gridVideos.findIndex(video => video.id === videoId);
    if (gridIndex !== -1) {
      const updatedGridVideos = [...state.gridVideos];
      updatedGridVideos[gridIndex] = {
        ...updatedGridVideos[gridIndex],
        streamStatus: status
      };
      
      set({ gridVideos: updatedGridVideos });
    }
  },
  
  getAvailableVideos: () => {
    const state = get();
    return [
      ...(state.currentVideo ? [state.currentVideo] : []),
      ...state.gridVideos.filter(video => video.streamStatus !== 'error')
    ];
  }
}));
