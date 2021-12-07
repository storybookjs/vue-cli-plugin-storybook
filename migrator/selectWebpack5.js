module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  root
    .find(j.AssignmentExpression, {
      left: {
        type: 'MemberExpression',
        object: { name: 'module' },
        property: { name: 'exports' },
      },
    })
    .forEach((path) => path.value.right.properties.push(
      j.property('init', j.identifier('core'), j.objectExpression([
        j.property('init', j.identifier('builder'), j.literal('webpack5')),
      ])),
    ));
  return root.toSource();
};
