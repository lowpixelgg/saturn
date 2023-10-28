const extensios = {
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
};

export function getMimeTypeAndExtensionFromBase64(b64: string) {
  const matches = b64.match(/^data:([A-Za-z]+\/[A-Za-z]+);base64,/);
  if (matches && matches.length === 2) {
    const mimeType = matches[1];
    const extension = extensios[mimeType];
    return {
      mimeType: mimeType,
      extension: extension || null,
    };
  }

  return {
    mimeType: null,
    extension: null,
  };
}
