/**
 * Formats file size in a human-readable format
 * @param bytes Size in bytes
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validates file type based on MIME type
 * @param file File to validate
 * @param allowedTypes Array of allowed MIME types
 * @returns Boolean indicating if file type is valid
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      const baseType = type.split('/')[0];
      return file.type.startsWith(baseType + '/');
    }
    return file.type === type;
  });
}

/**
 * Creates a URL for a file object
 * @param file File to create URL for
 * @returns Object URL
 */
export function createFileURL(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revokes a previously created object URL
 * @param url URL to revoke
 */
export function revokeFileURL(url: string): void {
  URL.revokeObjectURL(url);
}
