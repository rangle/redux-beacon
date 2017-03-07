function makeStrConsole() {
  let output = '';
  let isNested = false;

  function log(...messages) {
    const newMessages = messages.map(msg =>
      typeof msg !== 'string' ? JSON.stringify(msg) : msg
    ).join(' ');

    if (output.length > 0) {
      if (isNested) {
        output = `${output}\n  ${newMessages}`;
      } else {
        output = `${output}\n${newMessages}`;
      }
    } else {
      output = newMessages;
    }
  }

  function group(title) {
    isNested = true;
    output = output.length > 0 ? `${output}\n${title}` : title;
  }

  function groupEnd() {
    isNested = false;
  }

  const getOutput = () => output;

  return { log, getOutput, group, groupEnd };
}

module.exports = {
  makeStrConsole,
};
