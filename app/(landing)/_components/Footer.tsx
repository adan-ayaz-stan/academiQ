export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-primary">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-white md:text-left">
          Built by{" "}
          <a
            href={"/"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Spitfire
          </a>
          . The source code is available on{" "}
          <a
            href={"/"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-balance text-center text-sm leading-loose text-white md:text-left">
          &copy; 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
