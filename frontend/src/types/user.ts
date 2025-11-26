// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   token?: string;
// }

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'tutor' | 'admin';
  learningStyle: 'Visual' | 'Textual' | 'Auditory';
  streak: number;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserProfile;
}

export interface StudyPlanItem {
  id: string;
  topic: string;
  type: 'Quiz' | 'Reading' | 'Video';
  duration: string;
  status: 'pending' | 'completed';
}