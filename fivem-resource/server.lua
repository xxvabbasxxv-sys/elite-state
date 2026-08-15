local QBCore = exports['qb-core']:GetCoreObject()
local endpoint = GetConvar('qb_panel_endpoint', '')
local agentKey = GetConvar('qb_panel_agent_key', '')

local function headers()
  return { ['Content-Type'] = 'application/json', ['x-agent-key'] = agentKey }
end

local function finish(id, ok, result)
  PerformHttpRequest(endpoint .. '/api/agent/result', function() end, 'POST', json.encode({ id = id, ok = ok, result = result }), headers())
end

local function playerFor(source)
  source = tonumber(source)
  return source, QBCore.Functions.GetPlayer(source)
end

local function execute(command)
  local payload = command.payload or {}
  local source, Player = playerFor(payload.target)
  if command.action ~= 'console' and not Player then return false, 'Player is offline' end
  if command.action == 'give_item' then
    local ok = exports['qb-inventory']:AddItem(source, payload.item, tonumber(payload.amount), false, false, 'web-panel')
    return ok, ok and 'Item added' or 'Inventory full or invalid item'
  elseif command.action == 'remove_item' then
    local ok = exports['qb-inventory']:RemoveItem(source, payload.item, tonumber(payload.amount), false, 'web-panel')
    return ok, ok and 'Item removed' or 'Item unavailable'
  elseif command.action == 'give_money' then
    Player.Functions.AddMoney('cash', tonumber(payload.amount), 'web-panel')
    return true, 'Cash added'
  elseif command.action == 'remove_money' then
    local ok = Player.Functions.RemoveMoney('cash', tonumber(payload.amount), 'web-panel')
    return ok, ok and 'Cash removed' or 'Insufficient cash'
  elseif command.action == 'kick' then
    DropPlayer(source, payload.reason or 'Removed by server staff')
    return true, 'Player kicked'
  elseif command.action == 'ban' then
    -- txAdmin's command interface is version-dependent. Change this template if your txAdmin uses another ban command.
    ExecuteCommand(('txaBan %s %s'):format(source, payload.reason or 'Banned by server staff'))
    return true, 'Ban command sent to txAdmin'
  elseif command.action == 'console' then
    ExecuteCommand(payload.command)
    return true, 'Console command executed'
  end
  return false, 'Unsupported action'
end

CreateThread(function()
  if endpoint == '' or agentKey == '' then print('^1[qb-admin-bridge] Set qb_panel_endpoint and qb_panel_agent_key in server.cfg.^0'); return end
  while true do
    PerformHttpRequest(endpoint .. '/api/agent/poll', function(status, body)
      if status == 200 and body then
        local data = json.decode(body)
        if data and data.command then
          local ok, message = execute(data.command)
          finish(data.command.id, ok, { message = message })
        end
      end
    end, 'GET', '', headers())
    Wait(1500)
  end
end)
