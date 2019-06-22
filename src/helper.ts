function exitEduList(msg: string) {
    global.console.log(msg);
    const stdin: any = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", process.exit.bind(process, 0));
}

export { exitEduList };
