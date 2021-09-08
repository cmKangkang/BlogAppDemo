import Footer from "../../components/Footer";
import Header from "../../components/Header";
import style from './style.module.less';
export default function NotFound() {
  return (
  <div className='container'>
    <Header></Header>
    <div className={style.not_found}>
      <svg className="icon" viewBox="0 0 2355 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22133" width="200" height="200"><path d="M588.8 25.6v620.288H768v153.6h-179.2V998.4h-153.6v-198.912h-409.6v-173.1072L454.144 25.6h134.656zM2150.4 25.6v620.288h179.2v153.6H2150.4V998.4h-153.6v-198.912h-409.6v-173.1072L2015.744 25.6H2150.4zM1177.6 51.2c201.0112 0 332.8 196.3008 332.8 460.8s-131.7888 460.8-332.8 460.8-332.8-196.3008-332.8-460.8 131.7888-460.8 332.8-460.8z m0 153.6c-100.2496 0-179.2 117.6064-179.2 307.2s78.9504 307.2 179.2 307.2 179.2-117.6064 179.2-307.2-78.9504-307.2-179.2-307.2zM435.2 316.672l-234.8544 329.216H435.2v-329.216z m1561.6 0l-234.8544 329.216H1996.8v-329.216z" fill="#e6e6e6" p-id="22134"></path></svg>
      Page Not Found...
    </div>
    <Footer></Footer>
  </div>)
}