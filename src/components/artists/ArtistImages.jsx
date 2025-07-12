// ArtistImages.jsx
import { useState } from 'react'
import ImageGallery from './ImageGallery'

export default function ArtistImages({ images, fallbackImage ,slug }) {
  const safeImages = images?.length >= 3 ? images : [fallbackImage, fallbackImage, fallbackImage]
  return (
    <div className="w-full flex justify-center items-center">
      <ImageGallery images={safeImages} slug={slug }  />
    </div>
  )
}
