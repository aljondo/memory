defmodule Memory.Game do
	def new do
		letters = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]
		|> Enum.shuffle
		boardArray = get_board(letters, [], 0)
		%{
			letters: letters,
			board_array: boardArray,
			current_guesses: [],
			click_count: 0,
		}
	end

	def client_view(game) do
		#this is definitely too much work
		click_count = game.click_count
		completed = get_completed(game.board_array, [], 0)
		if Enum.count(game.current_guesses) == 2 do
			timeout = true
		else
			timeout = false
		end
		%{
			clickCount: game.click_count,
			completed: completed,
			guesses: game.current_guesses,
			timeout: timeout,
		}
	end

	def handle_guess(game, letter) do
		board = game.board_array
		guesses = game.current_guesses
		#implement
		#increment clickcount
		#if there"s no guess, at the guess and make it not hidden in the array
		#add it to guesses 
		if Enum.count(guesses) == 0 do
			tile = Enum.at(board, letter)
			guess = %{id: letter, letter: tile.letter}
			new_guesses = [guess | guesses]
			new_tile = %{letter: tile.letter, completed: false, hidden: false}
			new_board = List.replace_at(board, letter, new_tile)
		end

		#if there IS a guess:
		if Enum.count(guesses) == 1 do
			tile1 = Enum.at(board, letter) #tile1 is the new guess
			tile2_id = Enum.at(guesses, 0).id
			tile2 = Enum.at(board, tile2_id) #tile2 is the old guess, comes as {id: letter}
			if tile1.letter == tile2.letter do
				guess = %{id: letter, letter: tile1.letter}
				new_guesses = []
				new_tile1 = %{letter: tile1.letter, completed: true, hidden: false}
				new_tile2 = %{letter: tile2.letter, completed: true, hidden: false}

				new_board = List.replace_at(board, letter, new_tile1)
				|> List.replace_at(tile2_id, new_tile2)
			else
				guess = %{id: letter, letter: tile1.letter}
				new_guesses = [guess | guesses]
				new_tile1 = %{letter: tile1.letter, completed: false, hidden: false}
				new_tile2 = %{letter: tile2.letter, completed: false, hidden: false}

				new_board = List.replace_at(board, letter, new_tile1)
				|> List.replace_at(tile2_id, new_tile2)
			end
		#mark both guesses as not hidden and completed in the board_array
		#add them to guesses and completed


		#if the guess is not correct
		#mark both guesses as not correct
		#react handles the timeouts. nice.
		#if react gets guesses with size of 2, it renders them, starts 
		#the timeout appropriately, then sends signal "remove guesses"
		#remove_guesses should change each guess in the board array to hidden = true
		#then remove them from current guesses and update react again
		end
		%{	
			letters: game.letters,
			board_array: new_board,
			click_count: game.click_count + 1,
			current_guesses: new_guesses,
		}
	end

	def clear_guesses(game) do
		guesses = game.current_guesses
		board = game.board_array
		tile1 =  Enum.at(board, Enum.at(guesses, 0).id)
		tile2 =  Enum.at(board, Enum.at(guesses, 1).id)

		new_tile1 = %{letter: tile1.letter, completed: false, hidden: true}
		new_tile2 = %{letter: tile2.letter, completed: false, hidden: true}

		new_board = List.replace_at(board, Enum.at(guesses, 0).id, new_tile1)
		|> List.replace_at(Enum.at(guesses, 1).id, new_tile2)

		%{
			letters: game.letters,
			board_array: new_board,
			current_guesses: [],
			click_count: game.click_count,
		}
	end

	def reset_game(game) do
		letters = game.letters
		|> Enum.shuffle
		board_array = get_board(letters, [], 0)
		%{
			letters: letters,
			board_array: board_array,
			current_guesses: [],
			click_count: 0,
		}
	end

	def get_board(letters, board_array, n) when n == 16 do
		board_array
	end

	def get_board(letters, board_array, n) do
		letter = List.first(letters)
		new_letters = List.delete_at(letters, 0)
		board_map = %{letter: letter, completed: false, hidden: true}
		new_board = [board_map | board_array]
		get_board(new_letters, new_board, n + 1)
	end

	def get_completed(board, completed_array, n) when n == 16 do
		completed_array
	end

	def get_completed(board, completed_array, n) do
		tile = Enum.at(board, n)
		new_completed = completed_array
		if tile.completed do
			letter = tile.letter
			tile_map = %{id: n, letter: letter}
			new_completed = [tile_map | completed_array]
		end
		get_completed(board, new_completed, n + 1)
	end
end