export interface Message {
  id: number;
  sender_type: 'user' | 'manager';
  sender_name: string;
  message: string;
  created_at: string;
}

export interface Session {
  session_id: string;
  user_name: string;
  created_at: string;
  status: string;
  message_count: number;
  last_message_at: string | null;
  tags?: string[];
  archived?: boolean;
}

export interface ChatTag {
  id: string;
  name: string;
  color: string;
}

export interface QuickReply {
  id: string;
  title: string;
  message: string;
  category?: string;
}

export interface ChatStatistics {
  total_sessions: number;
  active_sessions: number;
  archived_sessions: number;
  total_messages: number;
  avg_response_time: number;
  sessions_today: number;
  sessions_week: number;
}
