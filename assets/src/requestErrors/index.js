import { admin } from 'generated/services/admin/compiled'

function getErrorActionMessage(action) {
    let errorText = '';
    if (action.error.response !== undefined) {
        let buffer = new Uint8Array(action.error.response.data);
        let response = admin.ErrorResponse.decode(buffer);
        errorText = response.message;
    } else {
        errorText = 'Unknown error (the admin service could be down)';
    }
    return errorText;
}

export default { getErrorActionMessage }