FROM denoland/deno
WORKDIR /
COPY . .
RUN deno cache --reload --lock=deno.lock --lock-write deps/dep.ts
CMD ["run", "--allow-read", "--allow-net", "--allow-env", "src/server.ts"]
EXPOSE 8080