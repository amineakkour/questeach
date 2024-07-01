import styles from "../styles/infos.module.css"
import { useStarterContext } from "../context/StarterProvider"

export default function Infos(){

  const {setShowInfos} = useStarterContext()
  return (
    <div className={styles.wrapper}>
      <div className={styles.infosContainer}>
        <div className={styles.closeIcon}>
          <i className="fa-solid fa-xmark" onClick={() => setShowInfos(false)}></i>
        </div>

        <div className={`${styles.para}`}>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti autem odio quos? Dignissimos odio ut fugiat fuga accusamus quam perspiciatis nesciunt temporibus in eos consectetur iusto, delectus, incidunt ex dolore doloribus blanditiis commodi minus! Dicta, veniam molestias ut eaque assumenda deleniti quisquam perferendis maxime expedita ipsa harum iste atque. Asperiores tempore eius maiores cum architecto expedita maxime explicabo nulla iste veniam. Commodi quidem facere repellendus quod culpa enim obcaecati debitis, error, eligendi, distinctio possimus suscipit optio dolor! Cum perspiciatis amet rem animi, saepe sunt id itaque. A numquam similique suscipit hic perferendis, sint voluptatum exercitationem mollitia culpa, aliquam, in quam.</p>
        </div>

        <div className={styles.para}>
          <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam!</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est officiis ab fugit autem minima illum distinctio. Beatae repellendus mollitia, aperiam exercitationem adipisci qui itaque dolore ducimus dolor, delectus pariatur optio omnis rerum obcaecati dolorem. Deserunt facere quae esse, delectus cupiditate unde iure non magnam ducimus culpa. Illum tenetur possimus, fuga nisi earum, sit iure a quod omnis tempora doloremque optio quis. Qui autem esse velit totam! At, animi quod?</p>
        </div>

        <div className={styles.para}>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quia?</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi dolorem debitis repellat quos nesciunt. Quibusdam, quam maxime exercitationem at dignissimos labore vero optio eius ut sint voluptates sed nesciunt asperiores saepe, fugit porro? Aspernatur recusandae perspiciatis corporis ad. Laudantium rem aliquid dolore molestias harum vero? Saepe, pariatur est. Nihil dignissimos consectetur aperiam magnam odio aliquam nobis tempore perferendis perspiciatis, natus numquam reprehenderit incidunt, libero dolorum cumque corrupti quas voluptatem vero ratione quisquam. Harum ullam similique voluptate, consequatur maiores labore ducimus tempora repudiandae nesciunt sit adipisci tenetur expedita provident. Voluptas cupiditate distinctio omnis ipsum doloribus consequatur culpa soluta expedita beatae?</p>
        </div>

        <div className={`${styles.para}`}>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti autem odio quos? Dignissimos odio ut fugiat fuga accusamus quam perspiciatis nesciunt temporibus in eos consectetur iusto, delectus, incidunt ex dolore doloribus blanditiis commodi minus! Dicta, veniam molestias ut eaque assumenda deleniti quisquam perferendis maxime expedita ipsa harum iste atque. Asperiores tempore eius maiores cum architecto expedita maxime explicabo nulla iste veniam. Commodi quidem facere repellendus quod culpa enim obcaecati debitis, error, eligendi, distinctio possimus suscipit optio dolor! Cum perspiciatis amet rem animi, saepe sunt id itaque. A numquam similique suscipit hic perferendis, sint voluptatum exercitationem mollitia culpa, aliquam, in quam.</p>
        </div>

        <div className={styles.para}>
          <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam!</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae est officiis ab fugit autem minima illum distinctio. Beatae repellendus mollitia, aperiam exercitationem adipisci qui itaque dolore ducimus dolor, delectus pariatur optio omnis rerum obcaecati dolorem. Deserunt facere quae esse, delectus cupiditate unde iure non magnam ducimus culpa. Illum tenetur possimus, fuga nisi earum, sit iure a quod omnis tempora doloremque optio quis. Qui autem esse velit totam! At, animi quod?</p>
        </div>

        <div className={styles.para}>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quia?</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi dolorem debitis repellat quos nesciunt. Quibusdam, quam maxime exercitationem at dignissimos labore vero optio eius ut sint voluptates sed nesciunt asperiores saepe, fugit porro? Aspernatur recusandae perspiciatis corporis ad. Laudantium rem aliquid dolore molestias harum vero? Saepe, pariatur est. Nihil dignissimos consectetur aperiam magnam odio aliquam nobis tempore perferendis perspiciatis, natus numquam reprehenderit incidunt, libero dolorum cumque corrupti quas voluptatem vero ratione quisquam. Harum ullam similique voluptate, consequatur maiores labore ducimus tempora repudiandae nesciunt sit adipisci tenetur expedita provident. Voluptas cupiditate distinctio omnis ipsum doloribus consequatur culpa soluta expedita beatae?</p>
        </div>

      </div>
    </div>
  )
}