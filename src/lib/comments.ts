import { createClient, PostgrestError } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL + '';
const supabaseKey = process.env.SUPABASE_KEY + '';

const supabase = createClient(supabaseUrl, supabaseKey);

interface SupabaseResult {
  data?: { username: string, payload: string, reply_of: string, image: string, slug: string };
  error?: PostgrestError;
}

const getComments = async (slug: string) => {
  const { data: comments, error }: SupabaseResult = await supabase
    .from('comments')
    .select('*')
    .match({ slug: slug });
  if (error) {
    'error'
};


switch (req.method) {
  // Get all comments
  case 'GET':
    const { data: getData, error: getError } = await supabase
      .from('comments')
      .select('*');
    if (getError) {
      return res.status(500).json({ message: getError.message });
    }
    return res.status(200).json(getData);
  // Add comment
  case 'POST':
    const comment = req.body;
    const { data: postData, error: postError } = await supabase
      .from('comments')
      .insert(comment);
    if (postError) {
      return res.status(500).json({ message: postError.message });
    }
    return res.status(200).json(postData);
  // Edit comment
  case 'PATCH':
    const { commentId: editcommentId, payload } = req.body;
    const { data: patchData, error: patchError } = await supabase
      .from('comments')
      .update({ payload })
      .eq('id', editcommentId);
    if (patchError) {
      return res.status(500).json({ message: patchError.message });
    }
    return res.status(200).json(patchData);
  // Delete comment
  case 'DELETE':
    const { comment_id: deleteCommentId } = req.query;
    if (typeof deleteCommentId === 'string') {
      const { data: deleteData, error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', deleteCommentId + '');
      if (deleteError) {
        return res.status(500).json({ message: deleteError.message });
      }
      return res.status(200).json(deleteData);
    }
  default:
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
}


export default { };
