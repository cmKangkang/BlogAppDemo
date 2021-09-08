import { uploadFile } from './api';
import { imagePreviewBaseUrl } from '../data';
interface Image {
  url: string, 
  title?: string, 
  alt?: string
}
export async function uploadImages(files: File[]): Promise<Image[]> {
  // 参数为文件列表，返回一个promise, 包含url，ttile，alt
  let res: Image[] = [];
  for(let i = 0; i < files.length; i++) {
    let file = files[i];
    let url = await upload(file);
    url = imagePreviewBaseUrl + url;
    let title = file.name;
    let alt = file.name;
    res.push({url, title, alt});
  }
  return res;
}

async function upload(file: File): Promise<string> {
  try {
    console.log(file);
    let formdata = new FormData();
    formdata.append('files', file);
    console.log(formdata.getAll('files'));
    let re = await uploadFile(formdata);
    if(re.stat === 'ok') {
      return re.data;
    } else {
      return '';
    }
  } catch(e) {
    console.log('上传失败：' + e);
    return '';
  }
}