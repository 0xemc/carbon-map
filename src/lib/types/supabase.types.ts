export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      segments: {
        Row: {
          data: number[] | null
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          data?: number[] | null
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          data?: number[] | null
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      trees: {
        Row: {
          date: string | null
          geom: unknown | null
          image_path: string | null
          lat: number | null
          lon: number | null
          score: number | null
        }
        Insert: {
          date?: string | null
          geom?: unknown | null
          image_path?: string | null
          lat?: number | null
          lon?: number | null
          score?: number | null
        }
        Update: {
          date?: string | null
          geom?: unknown | null
          image_path?: string | null
          lat?: number | null
          lon?: number | null
          score?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
