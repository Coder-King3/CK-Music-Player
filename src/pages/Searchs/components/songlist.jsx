import { useNavigate } from "react-router-dom";
import { buildPage } from "@/utils/Constructdata";
import LazyImage from "../../../components/LazyImage";

export default function SongList({ data, idx }) {
  const Navigate = useNavigate();

  function toPage(params) {
    console.log(idx);
    const path = buildPage(idx);
    Navigate(path + `?id=${params.id || params.videoId}`);
  }

  return (
    <>
      <div className="apps-card">
        {data.map((item) => (
          <div className="app-card"
            key={item.id}
            onClick={() => toPage(item)}>
            <span>
              <LazyImage
                src={
                  item.picUrl ||
                  item.coverImgUrl ||
                  item.avatarUrl ||
                  item.cover + "?param=430y430"
                }
              />
            </span>
            <div className="app-card__subtext textoverflow">
              {item.name || item.nickname || item.title}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
