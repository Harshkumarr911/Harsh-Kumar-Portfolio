function GalleryCard({
  image,
  alt,
  label,
  number,
  className = "",
  delay = "",
}) {
  return (
    <div className={`gallery-card ${className} ${delay}`}>
      <div className="gallery-image-wrap">
        <img src={image} alt={alt} loading="eager" />

        <div className="gallery-image-overlay" />

        <div className="gallery-card-top">
          <span>{number}</span>
          <span className="gallery-card-indicator">↗</span>
        </div>

        <div className="gallery-card-label">
          {label}
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;