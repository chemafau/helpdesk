export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketCategory = 'Login' | 'Database' | 'Application' | 'Network' | 'Hardware' | 'Email' | 'Access' | 'Performance';

export interface Ticket {
  ticket_id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  resolution?: string;
  user_name: string;
  user_avatar: string;
  agent_name?: string;
  application?: string;
  environment?: string;
}

export interface Comment {
  id: number;
  ticket_id: string;
  sender: string;
  sender_type: 'User' | 'Agent';
  message: string;
  timestamp: string;
  attachment?: string;
}

export interface KnowledgeBase {
  id: number;
  title: string;
  category: TicketCategory;
  content: string;
  tags: string[];
}

export interface AIAnalysis {
  possibleCauses: string[];
  recommendedAnswer: string;
  similarTickets: Ticket[];
  relatedSOPs: KnowledgeBase[];
}
