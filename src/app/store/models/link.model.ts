export interface Link {
  shortUrl: string;
  longUrl: string;
  date: Date;
}

export type LinkAddStatus = 'LINK_ADD_STATUS_START' | 'LINK_ADD_STATUS_COMPLETE' | 'LINK_ADD_STATUS_ERROR';
