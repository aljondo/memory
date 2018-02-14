defmodule Memory.GameBackup do
  use Agent

  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def save(name, game) do
    IO.puts "SAVING"
    IO.puts name
    IO.inspect game
    Agent.update __MODULE__, fn state ->
      Map.put(state, name, game)
    end
  end

  def load(name) do
    IO.puts "LOADING"
    IO.puts name
    Agent.get __MODULE__, fn state ->
      IO.inspect Map.get(state, name)
      Map.get(state, name)
    end
  end
end
