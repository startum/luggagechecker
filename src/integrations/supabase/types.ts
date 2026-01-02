export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      airlines_data: {
        Row: {
          airline_name: string
          callsign: string | null
          carry_on_size: string | null
          carry_on_weight: string | null
          checked_bag_size: string | null
          checked_bag_weight: string | null
          country_name: string | null
          iata_code: string | null
          id: number
          logo_url: string | null
          website_url: string | null
        }
        Insert: {
          airline_name: string
          callsign?: string | null
          carry_on_size?: string | null
          carry_on_weight?: string | null
          checked_bag_size?: string | null
          checked_bag_weight?: string | null
          country_name?: string | null
          iata_code?: string | null
          id?: number
          logo_url?: string | null
          website_url?: string | null
        }
        Update: {
          airline_name?: string
          callsign?: string | null
          carry_on_size?: string | null
          carry_on_weight?: string | null
          checked_bag_size?: string | null
          checked_bag_weight?: string | null
          country_name?: string | null
          iata_code?: string | null
          id?: number
          logo_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      airlines_data_backup: {
        Row: {
          airline_name: string | null
          callsign: string | null
          carry_on_size: string | null
          carry_on_weight: string | null
          checked_bag_size: string | null
          checked_bag_weight: string | null
          country_name: string | null
          iata_code: string | null
          id: number | null
          logo_url: string | null
          website_url: string | null
        }
        Insert: {
          airline_name?: string | null
          callsign?: string | null
          carry_on_size?: string | null
          carry_on_weight?: string | null
          checked_bag_size?: string | null
          checked_bag_weight?: string | null
          country_name?: string | null
          iata_code?: string | null
          id?: number | null
          logo_url?: string | null
          website_url?: string | null
        }
        Update: {
          airline_name?: string | null
          callsign?: string | null
          carry_on_size?: string | null
          carry_on_weight?: string | null
          checked_bag_size?: string | null
          checked_bag_weight?: string | null
          country_name?: string | null
          iata_code?: string | null
          id?: number | null
          logo_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      scheduled_posts: {
        Row: {
          created_at: string
          error_message: string | null
          facebook_post_id: string | null
          id: string
          image_url: string | null
          link: string | null
          post_template: string
          scheduled_time: string | null
          status: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          facebook_post_id?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          post_template: string
          scheduled_time?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          facebook_post_id?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          post_template?: string
          scheduled_time?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      temp_airlines_data: {
        Row: {
          carry_on_size: string | null
          carry_on_weight: string | null
          checked_bag_size: string | null
          checked_bag_weight: string | null
          iata_code: string
        }
        Insert: {
          carry_on_size?: string | null
          carry_on_weight?: string | null
          checked_bag_size?: string | null
          checked_bag_weight?: string | null
          iata_code: string
        }
        Update: {
          carry_on_size?: string | null
          carry_on_weight?: string | null
          checked_bag_size?: string | null
          checked_bag_weight?: string | null
          iata_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_airline_data: {
        Args: never
        Returns: {
          airline_name: string
          callsign: string | null
          carry_on_size: string | null
          carry_on_weight: string | null
          checked_bag_size: string | null
          checked_bag_weight: string | null
          country_name: string | null
          iata_code: string | null
          id: number
          logo_url: string | null
          website_url: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "airlines_data"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
