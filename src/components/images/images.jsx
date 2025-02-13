import { Image } from "antd";
import { useState } from "react";

export const ImageShow = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="modal-photo-container">
      <Image
        preview={{
          visible: false,
        }}
        width={200}
        src="assets/letter2025v.jpg"
        onClick={() => setVisible(true)}
      />
      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          <Image src="assets/letter2025v.jpg" />
          <Image src="assets/danren2024.jpg" />
          <Image src="assets/piaoliang2024.png" />
          <Image src="assets/hezhao2024.jpg" />
        </Image.PreviewGroup>
      </div>
    </div>
  );
};
