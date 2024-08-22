/* eslint-disable no-undef */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Asegúrate de que dotenv esté instalado y configurado

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

exports.handler = async function(event) {
    if (event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const token = event.headers['Authorization'] || event.headers['authorization'];
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        };
    }

    const { userId } = JSON.parse(event.body);
    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'User ID is required' }),
        };
    }

    try {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: error.message }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
