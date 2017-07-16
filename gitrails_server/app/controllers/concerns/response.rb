module Response
  def json_response(object, status = :ok, linked = nil)
    if linked
      render json: {object: object.to_s, linked: linked.to_s}, status: status
    else
      render json: object, status: status
    end
  end
end
