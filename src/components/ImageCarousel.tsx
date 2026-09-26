import { useState } from 'react'

export default function ImageCarousel({
  images,
  alt,
}: {
  images: Array<string>
  alt: string
}) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="island-shell flex aspect-square w-full items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--honey)_14%,var(--surface))] text-6xl">
        🍯
      </div>
    )
  }

  const hasMultiple = images.length > 1

  function prev() {
    setActive((i) => (i - 1 + images.length) % images.length)
  }

  function next() {
    setActive((i) => (i + 1) % images.length)
  }

  return (
    <div>
      <div className="island-shell relative aspect-square overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--honey)_14%,var(--surface))]">
        <img
          src={images[active]}
          alt={alt}
          className="h-full w-full object-cover"
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface-strong)] text-[var(--ink)] shadow-md transition hover:-translate-x-0.5"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface-strong)] text-[var(--ink)] shadow-md transition hover:translate-x-0.5"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((image, index) => (
                <span
                  key={image}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    index === active
                      ? 'bg-[var(--honey-deep)]'
                      : 'bg-[var(--surface-strong)]'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Image ${index + 1}`}
              className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
                index === active
                  ? 'border-[var(--honey-deep)]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
