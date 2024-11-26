import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill"

const supabaseUrl= "https://xkveywmtbhzcgmdvtvjq.supabase.co"

const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrdmV5d210Ymh6Y2dtZHZ0dmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODQ1ODEsImV4cCI6MjA0NTk2MDU4MX0.JE8CA1kGKhzcYXZRoo0AEzu5NJ4nmAU2qcpQYSgQ1qw"

export const supabase =  createClient(supabaseUrl, supabaseAnonkey)