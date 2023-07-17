class ApplicationController < ActionController::API
  # before_action :random_errors

  def random_errors
    if rand(1..10) == 1
      render json: { error: 'Unknown Error Occurred (did you handle it??)' }, status: :internal_server_error
    end
  end
end
