RegisterNUICallback('getIdentity', function(data, cb)
  -- local identity = vSERVER.getIdentity()
  -- pegar a identidade do jogador
  cb(identity)
end)