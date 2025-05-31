// src/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://epkyhgnnddwwtnpzjzxf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwa3loZ25uZGR3d3RucHpqenhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzQzODcsImV4cCI6MjA2NDIxMDM4N30.2X-T4dSZSSBxzg9-Bux3q175DfouIJcPSTgbbuhITLw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
