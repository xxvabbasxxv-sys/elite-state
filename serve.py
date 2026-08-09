from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent


class SpaHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean_path = unquote(urlparse(path).path).lstrip("/")
        translated = (ROOT / clean_path).resolve()
        try:
            translated.relative_to(ROOT)
        except ValueError:
            return str(ROOT / "index.html")

        if translated.exists():
            return str(translated)

        if "." not in Path(path.split("?", 1)[0]).name:
            return str(ROOT / "index.html")

        return str(translated)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=5178)
    args = parser.parse_args()

    server = ThreadingHTTPServer(("127.0.0.1", args.port), SpaHandler)
    print(f"Serving Mystery Town at http://127.0.0.1:{args.port}")
    server.serve_forever()
