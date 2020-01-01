// Create multi-part form containing serialized protobuf data
// - protobufType: protobufjs generated object with create, encode, decode methods
// - content: protobuf object instance to serialize and embed in a multi-part form as a blob in field 'proto'
export const createProtobufFormData = (protobufType, content) => {
    // Create protobuf object
    let message = protobufType.create(content);
    // Encode protobuf to Uint8Array
    let buffer  = protobufType.encode(message).finish();
    // Add UInt8Array to form data as blob
    let formData = new FormData();
    let protoBlob = new Blob([buffer]);
    formData.append('proto', protoBlob);
    return formData;
}
