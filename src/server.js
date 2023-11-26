{
    process.title = `_node_runtime_${process.env.NAME}`

    const inspector = (await import('node:inspector')).default;
    const { Session } = (await import('node:inspector/promises')).default;

    const session = new Session();
    const url = inspector.url();
    const exe = {
        eval: ({ script, id }) => {
            session.post('Runtime.evaluate', {
                expression: script,
            }).then(res => process.send({
                id, res: res.result,
            }))
        },
    };

    process.on('message', data => {
        exe[data.exe](data)
    });

    session.connect();
}