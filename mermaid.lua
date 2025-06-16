--[[ Pandoc filter: render Mermaid code blocks via mermaid-cli ]]
local system = require('pandoc.system')

function CodeBlock(cb)
  if not cb.classes:includes('mermaid') then return nil end
  local mmd = os.tmpname() .. '.mmd'
  local svg = mmd:gsub('%.mmd$', '.svg')

  -- write Mermaid code
  local f = io.open(mmd, 'w'); f:write(cb.text); f:close()

  -- run mermaid-cli
  os.execute(string.format('mmdc -i "%s" -o "%s"', mmd, svg))

  -- return image element
  return pandoc.Para{pandoc.Image(cb.attr.caption or '', svg)}
end