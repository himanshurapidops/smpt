import { SMTPServer } from "smtp-server";

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  hostname: "localhost",
  port: 1025,
  secure: false,
  logger: true,
  onConnect(session, cb) {
    console.log("onConnect", session.id);

    cb();
  },
  onMailFrom(address, session, cb) {
    console.log("onMailFrom", address, session.id);
    cb();
  },

  onRcptTo(address, session, cb) {
    console.log("onRcptTo", address, session.id);
    cb();
  },

  onData(stream, session, cb) {
    console.log("onData", session.id);
    stream.pipe(process.stdout);
    stream.on("data", (chunk) => {
      console.log(chunk.toString());
    });
    stream.on("error", (err) => {
      console.log("onData error", session.id);
      cb(err);
    });
    stream.on("end", () => {
      console.log("onData end", session.id);
      cb();
    });
  },
});

server.listen(1025, () => {
  console.log("Server running on port 1025");
});