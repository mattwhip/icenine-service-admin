const dashedString = (input, width) => {
     width = width || 4;
     // Add dashes to display ID
     // let dashed = input.replace(`/(.{${width}})/g`, "$1-");
     let dashed = input.replace(/(.{4})/g, "$1-");
     // Remove ending dash, if it exists
     dashed = dashed.replace(/-$/, "");
     return dashed;
}

export default { dashedString }
