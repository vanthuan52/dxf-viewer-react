export interface DXFEntity {
  type: string;
  [key: string]: any;
}

export interface DXFParsedData {
  entities: any[];
  blocks?: Record<string, { entities: any[] }>; // 👈 Bổ sung
}

//export type DXFEntity = any;
